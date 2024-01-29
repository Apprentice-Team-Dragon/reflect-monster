class Api::GoalsController < ApplicationController
  def get
    goal = Goal.find(goal_params[:id])

    render json: { goal: { id: goal.id, content: goal.content, isCompleted: goal.is_completed } }
  end

  def create
  end

  def update
  end

  private
    def goal_params
      params.permit(:id)
    end
end
