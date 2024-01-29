class Task < ApplicationRecord
  belongs_to :goal
  validates :goal_id, presence: true
  validates :content, presence: true
  validates :is_completed, presence: true
  validates :is_remoded, presence: true
  validates :exec_date, presence: true
end
