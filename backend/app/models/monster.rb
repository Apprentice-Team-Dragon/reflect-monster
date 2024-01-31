class Monster < ApplicationRecord
  validates :image, presence: true
  validates :evolution_stage, presence: true

  def generate_response
    { monster: { id: self.id, image: self.image, expPoint: self.exp_point, maxExpPoint: self.max_exp_point, evolutionStage: self.evolution_stage, species: self.species, color: self.color, seed: self.seed, isSelected: self.is_selected } }
  end
end
