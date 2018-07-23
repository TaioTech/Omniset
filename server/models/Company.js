const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  established: {
    type: Date,
    default: Date.now
  },
  employees: {
    type: Number
  },
  status: {
    type: String,
    default: 'public'
  },
  hasLogo: {
    type: Boolean,
    default: false
  },
  companyLogo: {
    type: String
  },
  primary: {
    type: String
  },
  secondary: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('company', CompanySchema);