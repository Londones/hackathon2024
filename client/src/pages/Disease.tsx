import React from "react";
import DiabeteForm from "@/components/DiabeteForm";
import HypertensionForm from "@/components/HypertensionForm";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Disease = () => {
    let { disease } = useParams<{ disease: string }>();

    const renderForm = () => {
        switch (disease) {
            case "diabete":
                return <DiabeteForm />;
            case "hypertension":
                return <HypertensionForm />;
            default:
                return <NotFound />;
        }
    };

    return <div className='flex justify-center'>{renderForm()}</div>;
};

export default Disease;
