class Api::MonstersController < ApplicationController
  before_action :set_monster, only: [:get, :update]
  def get
    render json: @monster.generate_response
  end

  def create
    monster = Monster.new(monster_params)

    if params[:monsterId]
      prev_monster = Monster.find(params[:monsterId])
      prev_monster.update(is_selected: false)
    else
      monster.set_random_color.set_random_image.set_random_species
    end


    if monster.save
      render json: monster.generate_response
    else
      render json: { message: user.errors.full_messages.join(" "), status: 422 }, status: :unprocessable_entity
    end
  end

  def update
    @monster.update(monster_params)
    render json: @monster.generate_response
  end

  private
    def set_monster
      @monster = Monster.find(params[:id])
    end

    def monster_params
      res = params.require(:monster).permit(:image, :species, :color, :seed, :is_selected, :expPoint, :maxExpPoint, :evolutionStage)

      transform_camel_to_snake(res)
    end
end
