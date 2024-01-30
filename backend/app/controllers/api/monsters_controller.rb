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
    @monster.update(monster_params)
    render json: generate_response(@monster)
  end

  private
    def set_monster
      @monster = Monster.find(params[:id])
    end

    def monster_params
      res = params.require(:monster).permit(:image, :species, :color, :seed, :is_selected, :expPoint, :maxExpPoint, :evolutionStage)

      transform_camel_to_snake(res)
    end

    def generate_response(monster)
      { monster: { image: monster&.image, expPoint: monster&.exp_point, maxExpPoint: monster&.max_exp_point, evolutionStage: monster&.evolution_stage, species: monster&.species, color: monster&.color, seed: monster&.seed, isSelected: monster&.is_selected } }
    end
end
