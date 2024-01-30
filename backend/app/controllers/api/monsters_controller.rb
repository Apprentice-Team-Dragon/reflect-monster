class Api::MonstersController < ApplicationController
  before_action :set_monster, only: [:get, :update]
  def get
    render json: generate_response(@monster)
  end

  def create
    monster = Monster.new(monster_params)

    if monster.save
      if params[:monsterId]
        prev_monster = Monster.find(params[:monsterId])
        prev_monster.update(is_selected: false)
      end

      render json: generate_response(monster)
    else
      render json: { message: user.errors.full_messages.join(" "), status: 422 }, status: :unprocessable_entity
    end
  end

  def update
  end

  private
    def set_monster
      @monster = Monster.find(params[:id])
    end

    def generate_new_monser
      flag = params[:monsterId]

      unless flag
        Monster.new(monster_params)
      else
        new_monster = Monster.new(monster_params)
        prev_monster = Monster.find(flag)
        prev_monster.update(is_selected: false)
        new_monster
      end
    end

    def monster_params
      input = params.require(:monster).permit(:image, :species, :color, :seed, :is_selected, :expPoint, :maxExpPoint, :evolutionStage)

      { image: input[:image], exp_point: input[:expPoint], max_exp_point: input[:maxExpPoint], evolution_stage: input[:evolutionStage], species: input[:species], color: input[:color], seed: input[:seed], is_selected: input[:is_selected] }
    end

    def generate_response(monster)
      { monster: { image: monster&.image, expPoint: monster&.exp_point, maxExpPoint: monster&.max_exp_point, evolutionStage: monster&.evolution_stage, species: monster&.species, color: monster&.color, seed: monster&.seed, isSelected: monster&.is_selected } }
    end
end
