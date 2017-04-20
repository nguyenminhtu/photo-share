class Image < ActiveRecord::Base
	acts_as_votable
	belongs_to :user
	has_many :comments

	mount_uploader :picture, ImageUploader

	validates :title, presence: true, length: { in: 6..20 }
	validates :description, presence: true, length: { minimum: 10 }
	validates :picture, presence: true
end
