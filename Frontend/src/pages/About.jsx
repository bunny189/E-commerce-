import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='my-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>About Our Company</h1>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            We are passionate about delivering high-quality products that enhance your lifestyle. 
            Our commitment to excellence drives everything we do.
          </p>
        </div>

        {/* Main Content */}
        <div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
          <div>
            <h2 className='text-3xl font-bold mb-6'>Our Story</h2>
            <p className='text-gray-600 mb-4'>
              Founded with a vision to provide exceptional products at competitive prices, 
              we've grown from a small startup to a trusted name in the industry.
            </p>
            <p className='text-gray-600 mb-4'>
              Our team of experts works tirelessly to curate the best products, 
              ensuring quality and customer satisfaction remain our top priorities.
            </p>
            <p className='text-gray-600'>
              We believe in building lasting relationships with our customers through 
              transparency, reliability, and outstanding service.
            </p>
          </div>
          <div className='relative'>
            <img 
              src={assets.about_img} 
              alt="About Us" 
              className='w-full h-96 object-cover rounded-lg shadow-lg'
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 mb-2'>1000+</div>
            <div className='text-gray-600'>Happy Customers</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-600 mb-2'>500+</div>
            <div className='text-gray-600'>Products</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-purple-600 mb-2'>50+</div>
            <div className='text-gray-600'>Categories</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-orange-600 mb-2'>24/7</div>
            <div className='text-gray-600'>Support</div>
          </div>
        </div>

        {/* Values Section */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-8'>Our Values</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='p-6 border border-gray-200 rounded-lg'>
              <div className='text-4xl mb-4'>🎯</div>
              <h3 className='text-xl font-semibold mb-3'>Quality</h3>
              <p className='text-gray-600'>
                We never compromise on quality. Every product meets our high standards.
              </p>
            </div>
            <div className='p-6 border border-gray-200 rounded-lg'>
              <div className='text-4xl mb-4'>🤝</div>
              <h3 className='text-xl font-semibold mb-3'>Trust</h3>
              <p className='text-gray-600'>
                Building trust through honest communication and reliable service.
              </p>
            </div>
            <div className='p-6 border border-gray-200 rounded-lg'>
              <div className='text-4xl mb-4'>💡</div>
              <h3 className='text-xl font-semibold mb-3'>Innovation</h3>
              <p className='text-gray-600'>
                Constantly evolving and improving to meet customer needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About