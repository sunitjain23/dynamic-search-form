import React, { useCallback, useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import debounce from "lodash/debounce";
import * as Yup from "yup";

const DynamicSearchForm = () => {
  const [savedData, setSavedData] = useState([]);
  const [submitData, setSubmitData] = useState([]);

  // Debounce the saveData function to avoid frequent updates.
  const saveData = useCallback(
    debounce((values) => {
      setSavedData(values.inputs);
    }, 1000),
    []
  );

  // Formik input validation schema using Yup.
  const validationSchema = Yup.object().shape({
    inputs: Yup.array().of(Yup.string().required("Required")),
  });

  return (
    <div>
      <h1>Please enter inputs</h1>
      <div className="mb-4">
        {submitData.length > 0 && (
          <div className="alert alert-info">
            Entered values are: <strong>{submitData.join(", ")}</strong>
          </div>
        )}
      </div>
      <Formik
        initialValues={{ inputs: [""] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          setSubmitData(values.inputs);
        }}
      >
        {({ values }) => {
          saveData(values);
          return (
            <>
              <Form>
                <FieldArray name="inputs">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.inputs.length > 0 &&
                        values.inputs.map((input, index) => (
                          <>
                            <div
                              key={index + input.toString}
                              className="input-group mb-3"
                            >
                              <Field
                                name={`inputs.${index}`}
                                placeholder="Enter text"
                                className="form-control"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => push("")}
                                >
                                  Add Field
                                </button>
                                {index && index > 0 ? (
                                  <button
                                    index={index}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                ) : null}
                              </div>
                            </div>
                            <ErrorMessage
                              name={`inputs.${index}`}
                              component="p"
                              className="field-error"
                            />
                            {savedData && (
                              <div className="input-group mb-3">
                                <p className="link-info px-2">
                                  {savedData[index]}
                                </p>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <button type="submit" className="btn btn-success">
                  Search
                </button>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default DynamicSearchForm;
