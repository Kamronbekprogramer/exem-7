import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_product } from "../../service/products";
import { Card, CardContent, Typography, CircularProgress, Grid, CardMedia, Divider, IconButton, Tooltip } from "@mui/material";
import { Tag } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {deleteItem} from "../../components/modal/products/index"
import "./single.css";

const SinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await get_product(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  const handleEdit = () => {
    console.log("Edit action");
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleUpload = () => {
    console.log("Upload action");
  };

  return (
    <Grid container spacing={2} justifyContent="center" className="single-page-container">
      <Grid item xs={12} md={10}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {product.image_url && (
                  <CardMedia
                    component="img"
                    height="auto"
                    image={product.image_url}
                    alt="Product"
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="div" gutterBottom sx={{ color: 'primary.main' }}>
                  {product.product_name}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'secondary' }}>
                  <strong>Description:</strong> {product.description}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'blue' }}>
                  <strong>Made In:</strong> {product.made_in}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'blue' }}>
                  <strong>Color:</strong> {product.color.join(", ")}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'red ' }}>
                  <strong>Size:</strong> {product.size.join(", ")}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'blue' }}>
                  <strong>Count:</strong> {product.count}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'red' }}>
                  <strong>Cost:</strong> ${product.cost}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'blue' }}>
                  <strong>Discount:</strong> {product.discount}%
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'blue' }}>
                  <strong>Age Range:</strong> {product.age_min} - {product.age_max} years
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'red' }}>
                  <strong>For Gender:</strong> {product.for_gender}
                </Typography>
                <Divider />
                <Tag color="blue" className="tag">
                  {product.category}
                </Tag>
                <Divider />
                <div className="actions">
                  <Tooltip title="Edit" arrow>
                    <IconButton onClick={handleEdit} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton onClick={handleDelete} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Upload Image" arrow>
                    <IconButton onClick={handleUpload} color="default">
                      <AddPhotoAlternateIcon sx={{ color: "green" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SinglePage;

