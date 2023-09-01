"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Box, Heading, Text, Select, Input, Button} from "@chakra-ui/react"
import ReactFlagsSelect from 'react-flags-select';

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [conversion, setConversion] = useState<number>(0);
//   const [conversionRate, setConversionRate] = useState<number>(0);
const [quotesList, setQuotesList] = useState<string[]>([]);
  useEffect(() => {
    const handleConversion = async () => {
      const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/listquotes',
        headers: {
          'X-RapidAPI-Key': 'ab9a337ad8mshc24d9d95e73f246p1fb73ejsn4c19b3715350',
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setQuotesList(response.data)
        console.log("list of countries", quotesList);
      } catch (error) {
        console.error(error);
      }
    };
    handleConversion();
  }, [])

  const conversionHandler = async () => {
    const options = {
      method: 'GET',
      url: 'https://currency-exchange.p.rapidapi.com/exchange',
      params: {
        from: fromCurrency,
        to: toCurrency,
        q: '1000'
      },
      headers: {
        'X-RapidAPI-Key': 'ab9a337ad8mshc24d9d95e73f246p1fb73ejsn4c19b3715350',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setConversion(amount * response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <Box w='500' h='650' bgGradient='linear(to-l, #7928CA, #FF0080)' className=' p-10 rounded-xl ' >
        
        <Text className=' text-center text-3xl text-white  ' > Currency Converter (Axiom Task) </Text>

      <Heading className=' mt-5 ' >From Currency:</Heading>
      
      <Select bg='black'  borderColor='white'  color='tomato' className='mt-5' >
        {
          quotesList ? quotesList.map((country: string)=>{
            return <option
            onClick={(e: any)=>{
              setFromCurrency(e.target.value)
              console.log("From currency is selected",fromCurrency);
            }}
            >{country}</option>
          }) : ("countries not found")
        }
      </Select>
      <Heading className=' mt-5 ' >To Currency:</Heading>
      <Select bg='black'  borderColor='white'  color='tomato' className=' mt-5 ' >
        {
          quotesList ? quotesList.map((country: string)=>{
            return <option
            onClick={(e: any)=>{
              setToCurrency(e.target.value)
              console.log("To currency is selected",toCurrency);
            }}
            >{country}</option>
          }) : ("countries not found")
        }
      </Select>
      <Heading className=' mt-5 ' >Enter Amount</Heading>
      <Input bg='black'  borderColor='white'  color='tomato'  type="number" className=' mt-5 '
      placeholder='Enter your amount'
      value={amount}
      onChange={(e: any)=>{
        setAmount(e.target.value)
      }} name="" id="" />
      <Button bg='black'  borderColor='white'  color='tomato'  className=' mt-5 ' onClick={conversionHandler}>Convert</Button>
      <Heading className=' text-white mt-5' >Converted amount from {fromCurrency} to currency {toCurrency} is {conversion ? conversion : "conversion in-process"}</Heading>
    </Box>
  );
}
export default CurrencyConverter;