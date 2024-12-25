import mongoose , {mongo, Schema} from "mongoose";
/*
const sessionSchema = new Schema({
    expires: {
        type: Date,
        required: true,
        index: { expires: '1h' } 

      },
      session: {
        type: String,
        required: true
      }
})*/

const sessionSchema = new Schema({
  sessionId: {
    type: String,       // UUID
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,        // Expiration date
    default: function() {
      return new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months from now
    }
  }
});
sessionSchema.index({ expiresAt: 1 });



export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

/**
 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
  sessionId: {
    type: String,       // UUID
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,        // Expiration date
    default: function() {
      return new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months from now
    }
  }
});

// Index for automatic session cleanup after expiration
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

 */