class Goal < ApplicationRecord
  has_many :tasks
  validates :content, presence: true
end
