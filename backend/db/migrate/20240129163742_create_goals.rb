class CreateGoals < ActiveRecord::Migration[7.1]
  def change
    create_table :goals do |t|
      t.text :content, null: false
      t.boolean :is_completed, default: false

      t.timestamps
    end
  end
end
