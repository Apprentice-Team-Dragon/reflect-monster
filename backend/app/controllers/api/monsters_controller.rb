class Api::MonstersController < ApplicationController
  before_action :set_monster, only: [:get, :update]
  def get
    render json: set_selected_monster
  end

  def create
    monster = Monster.new(monster_params).set_exp.set_max_exp.set_selected(true)

    # 進化する場合
    if params[:monsterId]
      prev_monster = Monster.find(params[:monsterId])
      prev_monster.update(is_selected: false)
      monster.set_evolution(prev_monster)
    # 卵を生成する場合
    else
      set_egg_value(monster)
    end

    # 進化段階が3以上なら進化できないと返す
    if monster.evolution_stage > 2
      render json: { message: "This monster will not evolve any further" }
    # 成功する時
    elsif monster.save
      render json: monster.generate_response
    # 失敗時
    else
      render json: { message: monster.errors.full_messages.join(" "), status: 422 }, status: :unprocessable_entity
    end
  end

  def update
    @monster.update(monster_params)
    render json: @monster.generate_response
  end

  private
    def set_selected_monster
      @selected_monster = Monster.find_by(is_selected: true)
    end

    def set_monster
      @monster = Monster.find(params[:id])
    end

    def monster_params
      res = params.require(:monster).permit(:expPoint, :image)

      transform_camel_to_snake(res)
    end

    def set_egg_value(monster)
      monster.set_random_color.set_random_image.set_random_species.set_max_exp.set_evolution_zero.set_seed_zero
      monster
    end
end
