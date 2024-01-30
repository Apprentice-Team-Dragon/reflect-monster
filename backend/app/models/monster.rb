class Monster < ApplicationRecord
  validates :image, presence: true
  validates :evolution_stage, presence: true
end
