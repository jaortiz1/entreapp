import mongoose, { Schema } from 'mongoose'

const poiSchema = new Schema({
  name: {
    type: String
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  qrCode: {
    type: String
  },
  audioguides: [{
    type: String
  }],
  description: {
    type: String
  },
  coverImage: {
    type: String
  },
  images: [{
    type: String
  }],
  year: {
    type: Number
  },
  creator: {
    type: String
  },
  status: {
    type: String
  },
  schedule: {
    type: String
  },
  price: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

poiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      qrCode: this.qrCode,  
      description: this.description,
      coverImage: this.coverImage,     
      year: this.year,
      creator: this.creator,
    }

    return full ? {
      ...view,
      coordinates: this.coordinates,
      audioguides: this.audioguides,
      images: this.images,
      status: this.status,
      schedule: this.schedule,
      price: this.price,
    } : view
  }
}

const model = mongoose.model('Poi', poiSchema)

export const schema = model.schema
export default model
