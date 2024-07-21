import React from 'react'
import Sidebar from './Sidebar';

function SecondLayerLinkingWithSidebar() {
    return (
        <div>
            <Sidebar overview="../../../admin/overview" applications="../../../admin/applications/list" hotelTypes="../../../admin/hotelTypes/list" hotelBar="../../../admin/hotelBar/list" hotelInfrastructure="../../../admin/hotelInfrastructure/list" hotelNutrition="../../../admin/hotelNutrition/list" hotelService="../../../admin/hotelService/list" hotelTransferServices="../../../admin/hotelTransferServices/list" employees="../../../admin/employees/list" roles="../../../admin/roles/list"></Sidebar>
        </div>
    )
}

export default SecondLayerLinkingWithSidebar