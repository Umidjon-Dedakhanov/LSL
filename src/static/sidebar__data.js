// Static Data goes here
import { FaRegListAlt, FaBookOpen, FaUserGraduate } from 'react-icons/fa';
import {IoCreateOutline} from "react-icons/io5"
import { BsGear } from 'react-icons/bs';
import TestMaker from '../components/tkt-test-maker/TestMaker';
import Ielts from '../components/ielts/Ielts';
import Candidates from '../components/candidates/Candidates';
import CreateBlogs from "../components/create-blogs/CreateBlogs"
import Manage from '../components/manage/Manage';

export const SIDEBAR_STATIC_DATA = [
    {
        id: 0,
        sidebarTitle: "TKT",
        icon: <FaRegListAlt/>,
        route: "tkt",
        component: <TestMaker/>,
    },
    {
        id: 1,
        sidebarTitle: "Manage Test",
        icon: <BsGear/>,
        route: "manage",
        component: <Manage/>,
    },
    {
        id: 2,
        sidebarTitle: "Candidates",
        icon: <FaUserGraduate/>,
        route: "candidates",
        component: <Candidates/>,
    },
    {
        id: 3,
        sidebarTitle: "IELTS",
        icon: <FaBookOpen/>,
        route: "ielts",
        component: <Ielts/>,
    },
    {
        id: 4,
        sidebarTitle: "Create Blogs",
        icon: <IoCreateOutline/>,
        route: "createblogs",
        component: <CreateBlogs/>,
    },
    
]