class Goal < ApplicationRecord
  has_many :tasks
  validates :content, presence: true


  def generate_response
    response = {
      goal: {
        id: self.id,
        content: self.content,
        isCompleted: self.is_completed,
        createdAt: self.created_at
      }
    }

    response
  end
end
