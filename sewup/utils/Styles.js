import { makeStyles } from "@material-ui/core";
const useStyles=makeStyles({
    navbar:{
        backgroundColor:"black",
        '& a':{
            color:'white',
            marginLeft:10,
            
        }
    },
    brand:{
        fontSize:'1.8rem',
        fontWeight:'bold'

    },
    grow:{
        flexGrow:'1',
    },
    main:{
        minHeight:'80vh',
        },
    footer:{
        marginTop:10,
        textAlign:'center',
       },
    section:{
        marginTop:10,
        marginBottom:10,
    },
    form:{
        maxWidth:800,
        margin:'0 auto'
    },
    navbarButton:{
        color:'white',
        textTransform:'initial',
        
    },
    transparentBackground:{
        backgroundColor:'transparent'
    },
    error:{
        color:'#f04040'
    }
    
})
export default useStyles;