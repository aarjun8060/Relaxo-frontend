import { Avatar, Box, Skeleton } from '@mui/material';
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {getProducts} from "../../../redux/slice/productRoutes";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import ReorderIcon from '@mui/icons-material/Reorder';

function Block1(props) {

  const router = useRouter();

  //useState setup
  const [loading,setLoading] = useState(true);
  const [limit,setLimit] = useState(9);
  const [page,setPage] = useState(1);
  const [filters,setFilters] = useState(router.query.query!== "a" ?{"category":router.query.query}:{});

  const[accordianStylediv,setAccordianStyleDiv] = useState('block');

  const handleAccordianStyle = () => {
    setAccordianStyleDiv(accordianStylediv === 'none' ? 'block' : 'none')
  }
  

  //redux state setup
  const dispatch = useDispatch();
  const {products,productsPagination} = useSelector((state)=> state.products);
  
  const handleGetProduct = () => {
    setLoading(true)
    dispatch(getProducts(page,limit,filters)); 
    setLoading(false)
  }
  // fetch product data function
  useEffect(()=>{
    handleGetProduct()
 },[page,limit,filters]);

const handleSetFilter = () => {
  setLoading(true)
  setFilters(router.query.query !=="a" ?{"category":router.query.query}:{})
  setLoading(false)
}

 useEffect(()=>{
  handleSetFilter()
 },[router.query.query])

 // change page 
 const handlePageChange = (value) =>{
  setLoading(true)
setPage(value);
setLoading(false)
 }

 // filter page
 const handleFilterChange = (query,type) =>{
 
  // Brand     
  if(type==='brand'){
        setFilters({...filters,['title.shortTitle']:{"$regex":query,"$options":"i"}});
      }
      else if(type==='gender'){
      setFilters({...filters,['title.longTitle']:{"$regex":query,"$options":"i"}});
      }
      else if(type==='category'){
        setFilters({...filters,['subCategory']:{"$regex":query,"$options":"i"}});
      }
     else if(type === 'Price Range'){
      // if(filters.price&&filters.price.mrp.$gte===query[0]){
      //   delete filters["price.mrp"]
      //   setFilters({...filters})
      // } else
        setFilters({...filters,"price.mrp":{"$gte":query[0],"$lte":query[1]}})
      }
      
      
 }
    
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [style, setStyle] = useState({display: 'none'});
  
  const arr = [1, 2, 3, 4, 5, 6];
 

  return (
    
    <div className='flex flex-col mt-[80px] md:mt-[70px] w-[350px] md:w-[100%]'>
    <div className='flex flex-col md:flex-row gap-5 w-[350px]'>
      <div className='flex flex-col  ml-[20px]'>
        <h1 className='md:mt-[120px] '>Your Selection</h1>
      
          <div className='md:mt-[70px] mt-[15px] flex flex-col justify-center items-center'>
          <div className='block md:hidden mr-[15px]'>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{width:"320px",borderRadius:"0%",fontSize:"300", marginRight:"18px",display:{sm:"none",md:"none",xs:"block"}}}>
              <AccordionSummary
                onClick={handleAccordianStyle} 
                sx={{backgroundColor:"black",color:"#fff"}}
                expandIcon={<ReorderIcon sx={{color:"#fff",fontSize:"30px"}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '66%', flexShrink: 0 }}>
                  PRODUCT FILTERS
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </AccordionSummary>
            </Accordion>
            </div>
          <div className='md:block  mr-[15px]' style = {{display: accordianStylediv}}  >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{width:{md:"200px",xs:"320px"},display:{md:"block"}}}>
              <AccordionSummary
                sx={{borderRadius:{xs:"0px"}}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Brand
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </AccordionSummary>
              <AccordionDetails >
                  <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="RELAXO" onClick={() => handleFilterChange('relaxo','brand') }  control={<Radio />} label="RELAXO" />
              <FormControlLabel value="SPARX" onClick={() => handleFilterChange('sparx','brand') }  control={<Radio />} label="SPARX" />
              <FormControlLabel value="FLITE" onClick={() => handleFilterChange('flite','brand') }   control={<Radio />} label="FLITE" />
              <FormControlLabel value="BAHAMAS" onClick={() => handleFilterChange('bahamas','brand') }  control={<Radio />} label="BAHAMAS" />
              <FormControlLabel value="BOSTON"  onClick={() => handleFilterChange('boston','brand') }  control={<Radio />} label="BOSTON" />
              <FormControlLabel value="MARYJANE" onClick={() => handleFilterChange('maryjane','brand') }  control={<Radio />} label="MARYJANE" />
              <FormControlLabel value="KIDS FUN" onClick={() => handleFilterChange('kids fun','brand') }  control={<Radio />} label="KIDSFUN
    " />

            </RadioGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{width:{md:"200px",xs:"320px"},display:"block" }}>
              <AccordionSummary
              sx={{borderRadius:{xs:"0px"}}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Category
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="SLIPPERS" control={<Radio />} label="SLIPPERS" 
                onClick={() => handleFilterChange('slippers','category') }  

              />
              <FormControlLabel value="SHOES" control={<Radio />} label="SHOES" 
                onClick={() => handleFilterChange('shoes','category') }  

              />
              <FormControlLabel value="CLOGS" control={<Radio />} label="CLOGS"
                onClick={() => handleFilterChange('clogs','category') }  
              />
              <FormControlLabel value="SANDALS" control={<Radio />} label="SANDALS" 
                onClick={() => handleFilterChange('sandals','category') }  

              />
              <FormControlLabel value="BELLE" control={<Radio />} label="BELLE" 
                onClick={() => handleFilterChange('belle','category') }  

              />
              <FormControlLabel value="SLIP ONS" control={<Radio />} label="SLIP ONS" 
                onClick={() => handleFilterChange('SLIP ONS','category') }  

              />
            </RadioGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{width:{md:"200px",xs:"320px"},display:"block" }}>
              <AccordionSummary
                sx={{borderRadius:{xs:"0px"}}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Gender
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </AccordionSummary>
              <AccordionDetails>
              <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" 
                onClick={() => handleFilterChange('women','gender') }  
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" 
                onClick={() => handleFilterChange('men','gender') }  
              />
              <FormControlLabel value="other" control={<Radio />} label="Other" 
                onClick={() => handleFilterChange('kid','gender') }  
              />
            </RadioGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{width:{md:"200px",xs:"320px"},display:"block"}}>
              <AccordionSummary
                sx={{borderRadius:{xs:"0px"}}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '64%', flexShrink: 0 }}>
                  Price Range
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </AccordionSummary>
              <AccordionDetails>
              <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="under -Rs 499" control={<Radio />} label="under -Rs.499" 
                onClick={() => handleFilterChange([0,499],'Price Range') }  
              />  
              <FormControlLabel value="Rs 500-999" control={<Radio />} label="Rs 500-999" 
                onClick={() => handleFilterChange([500,999],'Price Range') }   
              /> 
              <FormControlLabel value="Rs 1000-1999" control={<Radio />} label="Rs 1000-1999" 
                onClick={() => handleFilterChange([1000,1999],'Price Range') }  
              />
              <FormControlLabel value="Rs 2000-3000" control={<Radio />} label="Rs 2000-3000" 
                onClick={() => handleFilterChange([2000,3000],'Price Range') }  
              />
            </RadioGroup>
              
              </AccordionDetails>
            </Accordion>
            </div>
       
          </div>
      </div>
      <div className='md:mt-[130px] mt-[10px] md:ml-[40px] ml-[23px] w-[350px] sm:w-[1000px]'>
      <div className='flex '>
        <h1 className='font-normal text-2xl '>New Arrivals-</h1>
        <h1 className='font-normal text-2xl text-gray-500'> {productsPagination.itemCount}</h1>
      </div>

      <div className='flex mt-[80px] w-[360px] md:w-[1000px] flex-wrap'>
      {
      
        loading ?
        (
          <div className='flex flex-wrap gap-3'> 
          {
            arr.map((item) => (
              <Stack  key={item} sx={{width:"300px",height:"300px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                <div className='w-[100%] flex justify-center items-center'>
                  <Skeleton  animation="wave" variant="circular" width={100} height={100}  />
                </div>
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </Stack>
            ))
          }
          </div>
        )
    : (


        products.map((data,index)=> (
          <Card key={index} onClick={() => router.push(`/product/${data.id}`)} sx={{borderRadius:"0px",display:"flex",flexDirection:"column",justifyContent:"space-around",Width:"90px",marginBottom:"40px",marginLeft:"8px",transform:"0" ,boxShadow:"0","&:hover" :{boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",transform:"scale(1.12)",'& .displaybox':{display:"flex"}}}}   
          onMouseEnter={e => {
                      setStyle({display: 'block'});
                  }} 
                  onMouseLeave={e => {
                      setStyle({display: 'none'})
                  }}>
        <CardContent sx={{marginBottom:"0px",padding:"0px"}}>
          <Avatar alt='' src={data.image}  sx={{borderRadius:"0px",width:"280px",height:"200px" ,marginLeft:"10px"}}  />
          <Typography sx={{marginTop:"50px",color:"#374A94",fontSize:"16px",textAlign:"center"}}> <span className='text-[#374A94] font-semibold'>{data.title.shortTitle} </span>{data.title.longTitle.substring(0,data.title.longTitle.length-7)}</Typography>
          <Typography sx={{marginTop:"1px",color:"#374A94",fontSize:"15px",textAlign:"center"}}>{data.title.longTitle.substring(data.title.longTitle.length-7)}</Typography>
          <Typography sx={{marginTop:"1px",fontSize:"18px",textAlign:"center"}}>₹ {data.price.mrp}.00</Typography>      
        </CardContent>
        <Box className="displaybox"  sx={{display:"flex",flexDirection:"column"}}  style={style}>

        
        <CardContent sx={{display:"flex",padding:"0px",marginTop:"10px",marginBottom:"10px",alignItems:"center",justifyContent:"center",gap:"8px",width:"100%"}}>
          
            <div className='w-[100px]'>
              <Typography sx={{marginTop:"1px",fontSize:"16px",textAlign:"center"}}>Color</Typography>
                <div className='flex w-[20px]  justify-between gap-2 items-start'>
                  <Checkbox {...label} defaultChecked color="error" sx={{color:"red" ,fontSize:"3px",width:"1px",height:"1px" }} /> 
                  <Checkbox {...label} defaultChecked  sx={{fontSize:"3px",textAlign:"center",width:"1px",height:"1px" }} /> 
                  <Checkbox {...label} defaultChecked color="success" sx={{fontSize:"3px",textAlign:"center",width:"1px",height:"1px" }}/> 
                  <Checkbox {...label} defaultChecked color="default" sx={{fontSize:"3px",textAlign:"center",width:"1px",height:"1px" }} /> 
                </div>
                
            </div>
            <Divider sx={{border:"1px solid black",height:"40px"}}/>
            <div>
              <Typography sx={{marginTop:"1px",fontSize:"16px",textAlign:"center"}}>Size</Typography>
              <div className='flex gap-2'>
                <div>2</div>
                <div>4</div>
                <div>6</div>
              </div>
              
            </div>
          
        </CardContent>
        <div className='w-full flex justify-center items-center mb-[40px]'>
        <button className='px-[30px] bg-[#374A94] text-[#fff] rounded-2xl hover:bg-[#374A94] py-[6px] '>
          VIEW DETAILS
        </button> 
        </div>
        </Box>
        
      </Card>
    ))
    )
    }
      
      
      </div>
      </div>

    </div>
 
    <div className='md:w-[100%] w-[350px] flex justify-center items-center'>
    <Stack spacing={3}  >
       
      <Pagination onChange={(e,page) => handlePageChange(page)} count={productsPagination.pageCount} variant="outlined" shape="rounded" boundaryCount={4}/>
    </Stack>
    </div>
    </div>)
 
}

export default Block1
