class Admin::ImagesController < AdminController

	def index
		@images = Image.order("created_at DESC").paginate(:page => params[:page], per_page: 5)
	end

	def destroy
		@image = Image.find(params[:id])
		respond_to do |format|
			if @image
				@image.destroy
				format.js
			else
				redirect_to admin_images_path
				flash[:error] = "Image does not exist on our database"
			end
		end
	end

end