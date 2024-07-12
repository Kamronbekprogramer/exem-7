import { Search } from "@mui/icons-material";
import { Button, TextField, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductsModal } from "@modal";
import productsApi from "../../service/products";
import { ProductsTable } from "@ui";
import Pagination from "@mui/material/Pagination";

function Index() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });

  const getData = async () => {
    try {
      const response = await productsApi.get({
        ...params,
        search,  
      }); 
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
        let total = Math.ceil(response?.data?.total_count / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params, search]);

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
    }));
  };

  return (
    <>
      <ProductsModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex justify-between items-center my-5">
        <div className="w-[400px]">
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
              style: {
                paddingRight: "12px",
                height: "45px",
              },
            }}
          />
        </div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Products
        </Button>
      </div>
      <ProductsTable data={data} />
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </>
  );
}

export default Index;

