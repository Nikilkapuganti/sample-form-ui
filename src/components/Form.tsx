import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, FormAction } from '../interfaces/Index';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Form: React.FC<FormAction> = ({ onResult, onError }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageType, setpageType] = useState(false);
  const [id, setid] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let params = useParams()

  useEffect(() => {
    let windowPage = window.location.href.includes('add') ? 'add' : 'edit';
    if (windowPage == 'edit') {
      setpageType(true);
      fetchDataofUser();
    } else {
      setpageType(false);
    }
  }, []);


  const fetchDataofUser = async () => {
    try {

      const response = await axios.get(`http://localhost:3010/user/${params.userId}/get`);
      const userData = response.data[0];

      if (userData) {
        const { firstName, lastName, email, phoneNumber } = userData;
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('email', email);
        setValue('phoneNumber', phoneNumber);
      } else {
        console.error('Invalid data format or empty array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormSubmit = async (data: User) => {
    try {
      setIsLoading(true);

      const payload: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber
      };

      const url = pageType ? `http://localhost:3010/user/${params.userId}/update` : 'http://localhost:3010/user/create';
      await axios.post(url, payload);

      navigate('/users');
      onResult('Successfully inserted');
    } catch (error) {
      console.error('Error occurred during submission. Please try again.');
      if (onError) {
        onError('Error fetching data. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          {...register('firstName', {
            required: 'Please enter a valid firstName.'

          })}
          className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && <div className="text-red-500">{errors.firstName.message}</div>}
      </div>
      <div>
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          {...register('lastName', {
            required: 'Please enter a valid  lastname'

          })}
          className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && <div className="text-red-500">{errors.lastName.message}</div>}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          {...register('email', {
            required: 'Please enter a valid email.',
            pattern: {
              // Use a regular expression for basic email validation
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Please enter a valid email address.',
            },
          })}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block mb-1">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register('phoneNumber', {
            required: 'Please enter a valid number.',
            pattern: {
              value: /^[0-9]{10}$/i,
              message: 'Please enter a valid 10-digit phone number.',
            },
          })}
          className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
        />
        {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber.message}</div>}
      </div>

      <button
        type="submit"
        className={`w-full p-2 rounded transition-colors ${(isLoading || Object.keys(errors).length > 0)
          ? 'bg-gray-300 cursor-not-allowed text-gray-500'
          : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        disabled={isLoading || Object.keys(errors).length > 0}
      >
        {pageType ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;

