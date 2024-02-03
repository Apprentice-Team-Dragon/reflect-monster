class Api::GoalsController < ApplicationController
  before_action :set_goal, only: [:get, :update, :content]
  def get
    render json: { goal: @goal.generate_response }
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
    if @goal.update(transform_camel_to_snake(put_params))
      render json: @goal.generate_response
    else
      render json: { message: @goal.errors, status: 422 }, status: :unprocessable_entity
    end
  end

  def content
    tasks = Task.where(goal_id: @goal[:id])

    render json: { content: combined_task_and_goal_content(@goal, tasks) }
  end

  private
    def set_goal
      @goal = Goal.find(params[:id])
    end

    def get_content_params
      params.require(:goal).permit(:content)
    end

    def put_params
      params.require(:goal).permit(:content, :isCompleted)
    end

    def combined_task_and_goal_content(goal, tasks)
      contents = tasks.reduce([goal[:content]]) { |result, task| result.push(task[:content]) }
      contents.join(" ")
    end
end
