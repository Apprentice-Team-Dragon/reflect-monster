class Api::GoalsController < ApplicationController
  before_action :set_goal, only: [:get, :update]
  def get
    render json: { goal: goal_response(@goal) }
  end

  def create
    goal = Goal.new(get_content_params)

    if goal.save
      render json: goal.generate_response
    else
      render json: { message: user.errors.full_messages.join(" "), status: 422 }, status: :unprocessable_entity
    end
  end

  def update
    if @goal.update(create_update_param)
      render json: @goal.generate_response
    else
      render json: { message: @goal.errors, status: 422 }, status: :unprocessable_entity
    end
  end

  private
    def set_goal
      @goal = Goal.find(params[:id])
    end

    def create_update_param
      res = {}
      input = put_params

      res[:content] = input[:content] if input[:content]
      res[:is_completed] = input[:isCompleted] if input[:isCompleted]

      res
    end

    def goal_response(goal = nil)
      { id: goal&.id, content: goal&.content, isCompleted: goal&.is_completed }
    end

    def get_content_params
      params.require(:goal).permit(:content)
    end

    def put_params
      params.require(:goal).permit(:content, :isCompleted)
    end
end
