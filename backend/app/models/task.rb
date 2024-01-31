class Task < ApplicationRecord
  belongs_to :goal
  validates :goal_id, presence: true
  validates :content, presence: true
  validates :exec_date, presence: true

  def generate_response
    response = {
      id: self.id,
      content: self.content,
      isCompleted: self.is_completed,
      exec_date: self.exec_date,
      isRemoved: self.is_removed
    }

    response
  end
end
