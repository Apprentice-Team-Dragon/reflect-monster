class CreateMonsters < ActiveRecord::Migration[7.1]
  def change
    create_table :monsters do |t|
      t.text :image, null: false
      t.bigint :exp_poinst, null: false
      t.bigint :max_exp_point, null: false
      t.integer :evolution_stage, null: false
      t.string :species, null: false
      t.string :color, null: false
      t.integer :seed, null: false, default: 0
      t.boolean :is_selected, null: false, default: false

      t.timestamps
    end
  end
end
