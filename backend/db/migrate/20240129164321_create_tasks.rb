class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :goal, null: false, foreign_key: true
      t.text :content, null: false
      t.boolean :is_completed, null: false, default: false
      t.boolean :is_removed, null: false, default: false
      t.date :exec_date, null: false

      t.timestamps
    end
  end
end
