import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='my-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>Contact Us</h1>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
                  placeholder='Your full name'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
                  placeholder='your.email@example.com'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
                  placeholder='What is this about?'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
                  placeholder='Your message...'
                />
              </div>
              
              <button
                type='submit'
                className='w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            <div>
              <h2 className='text-2xl font-bold mb-6'>Get in Touch</h2>
              <p className='text-gray-600 mb-6'>
                We're here to help and answer any questions you might have. 
                We look forward to hearing from you.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <span className='text-blue-600 text-xl'>📍</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Address</h3>
                  <p className='text-gray-600'>123 Business Street, Tech City, TC 12345</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <span className='text-green-600 text-xl'>📧</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Email</h3>
                  <p className='text-gray-600'>info@ecommerce.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <span className='text-purple-600 text-xl'>📞</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Phone</h3>
                  <p className='text-gray-600'>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Contact Image */}
            <div className='mt-8'>
              <img 
                src={assets.contact_img} 
                alt="Contact Us" 
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact