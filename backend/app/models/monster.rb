class Monster < ApplicationRecord
  validates :image, presence: true
  validates :evolution_stage, presence: true

  def generate_response
    { monster: { id: self.id, image: self.image, expPoint: self.exp_point, maxExpPoint: self.max_exp_point, evolutionStage: self.evolution_stage, species: self.species, color: self.color, seed: self.seed, isSelected: self.is_selected } }
  end

  def set_random_color
    colors = %w(red blue green orange black white yellow gray brown pink purple)

    self.color = colors[rand(0...colors.length)]
    self
  end

  def set_random_species
    species = %w(rat ox tiger rabbit dragon snake horse goat monkey rooster dog boar)

    self.species = species[rand(0...species.length)]
    self
  end

  def set_random_image
    egg_images = %w(egg1 egg2 egg3 egg4 egg5 egg6)

    self.image = egg_images[rand(0...egg_images.length)]
    self
  end

  def set_selected(bool)
    self.is_selected = bool
    self
  end

  # デモによって値は修正する
  def set_max_exp
    self.max_exp_point = 6
    self
  end

  def set_evolution_zero
    self.evolution_stage = 0
    self
  end

  def set_seed_zero
    self.seed = 0
    self
  end

  def set_exp
    self.exp_point = 0
    self
  end

  def set_evolution_stage(stage)
    self.evolution_stage = stage
    self
  end

  def set_evolution(prev_monster)
    self.species = prev_monster.species
    self.color = prev_monster.color
    self.evolution_stage = prev_monster.evolution_stage + 1

    self
  end

  def set_seed_prev_monster(prev_monster)
    self.seed = prev_monster.seed
  end
end
