import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/header';
import { useFormik } from 'formik';
import { createProduct, getBrands, getCategories } from '../../api/products.ts';
import { useAlert } from '../../components/alert/useAlert.ts';

import './create-product-style.css';

interface Option {
  title: string;
  value: string;
}

const mapStringsToOptions = (array: string[]): Option[] => {
  return array.map((item) => ({ title: item, value: item.toLowerCase().split(' ').join('_') }));
};

const CreateProduct: React.FC = () => {
  const { showAlert } = useAlert();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_error, setError] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [brandOptions, setBrandOptions] = useState<Option[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '100',
      brand: '',
      rating: 3,
      category: '',
      image: undefined,
    },
    onSubmit: async (values, formikHelpers) => {
      try {
        await createProduct(values);

        showAlert('success', 'Product was successfully created.');
        formikHelpers.resetForm();
        void formikHelpers.setFieldValue('iamge', undefined);
      } catch {
        showAlert('danger', 'Error during product creation.');
        setError(true);
      }
    },
  });

  useEffect(() => {
    void (async () => {
      try {
        const [categories, brands] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);

        const categoryOptions = mapStringsToOptions(categories);
        const brandOptions = mapStringsToOptions(brands);

        setCategoryOptions(categoryOptions);
        setBrandOptions(brandOptions);

        void formik.setFieldValue('brand', brandOptions[0].value);
        void formik.setFieldValue('category', categoryOptions[0].value);
      } catch {
        setError(true);
        showAlert('danger', 'Something went wrong');
      }
      setIsFormDisabled(false);
    })();
  }, []);

  return (
    <div className="os-container">
      <Header pageTitle="Create Product"/>

      <main className="">
        <form
          className={`w-50 ${formik.submitCount && formik.isValid && 'was-validated'}`}
          noValidate
          data-cy="create-product-form"
          onSubmit={formik.handleSubmit}
        >
          <fieldset disabled={isFormDisabled}>
            <div className="mb-3">
              <label htmlFor="productTitle" className="form-label">Product title</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                required
                className="form-control"
                id="productTitle"
                placeholder="title"
                data-cy="title"
              />
              <div className="invalid-feedback">Please fill title</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                required
                min="0"
                max="85000"
                step="100"
                className="form-control"
                id="productPrice"
                data-cy="price"
              />
              <div className="invalid-feedback">Please set price</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productBrand" className="form-label">Product brand</label>
              <select
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                id="productBrand"
                className="form-select"
                data-cy="brand"
              >
                {brandOptions.map((brand) => (
                  <option key={brand.value} value={brand.value}>{brand.title}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="productRating" className="form-label">
                Product rating
              </label>
              <div className="w-100">
                <input
                  type="range"
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  min="1"
                  max="5"
                  step="1"
                  className="w-100"
                  id="productRating"
                  list="ratingMarkers"
                  data-cy="rating"
                />
                <datalist id="ratingMarkers" className="w-100">
                  <option value="1" label="1"></option>
                  <option value="2" label="2"></option>
                  <option value="3" label="3"></option>
                  <option value="4" label="4"></option>
                  <option value="5" label="5"></option>
                </datalist>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">Product category</label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                id="productCategory"
                className="form-select"
                data-cy="category"
              >
                {categoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>{category.title}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">Product image</label>
              <input
                className="form-control"
                name="image"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    void formik.setFieldValue('image', e.currentTarget.files[0]);
                  }
                }}
                required
                type="file"
                accept=".jpg, .jpeg, .png"
                id="productImage"
                data-cy="image"
              />
              <div className="invalid-feedback">Please choose product image</div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              data-cy="create-product-submit-btn"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </>
              ) : 'Submit'}
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};


export default CreateProduct;