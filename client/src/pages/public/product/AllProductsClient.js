 import React , {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../../actions/authActions";
 import Singleproductcard from "../../../components/product/singleProductCard"
 import {Menu} from "primereact/menu";
 import LandingNavbar from "../../../components/Navbar/LandingNavbar";
 // import LandingHeader from "../../../components/Header/LandingHeader";
 import _findIndex from "lodash.findindex";
 import Footer from "../../../components/Footer/PublicFooter";
 import "../../../assets/css/simple-sidebar.css"

class AllProductsClient extends Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            category:[],
            products: [],
            itemList : []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        axios
            .get("/api/products/allproducts")
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        products: res.data
                    })
                    console.log(res.data)
                }

            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
        axios
            .get("/api/categories/getall" )
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        category: res.data
                    });
                    console.log(res.data)
                }

            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });



    }

    priductViewByCategoryId = (id) =>{
        this._isMounted = true;
        axios
            .get("/api/products/Category/" + id)
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        products: res.data
                    });
                }

            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {


    // const items = [
    //         {
    //             label: 'Category',
    //             items: [
    //                     {label: 'All', icon: 'pi pi-list'},
    //                     {label: 'Men', icon: 'pi pi-list'},
    //                     {label: 'Women', icon: 'pi pi-list'},
    //                     {label: 'Children', icon: 'pi pi-list'},
    //                     this.state.category.map((value, index1) => {
    //                         return (
    //                             {
    //                                 label: value.title,
    //                                 icon: 'pi pi-list'
    //                             }
    //                         )
    //
    //                      })
    //
    //             ]
    //         }
    // ]

        return (
            <>
                <LandingNavbar
                    {...this.props}
                    navBarColor = "#fff"
                    navBarFontColor= "text-dark"
                />


                <section>
                    <div className="container-fluid mt-5 pt-5" style={{backgroundColor:"#f0f0f0", minHeight:"80vh"}}>
                        <div className="float-left ml--2 mt-3" >
                            {/*<Menu  model = {items} style={{minHeight : "80vh"}} />*/}

                            <div className="bg-white border-right" id="sidebar-wrapper">
                                <div className="bg-light sidebar-heading">Category</div>
                                <div className="list-group list-group-flush">
                                    <a href="#" onClick={(e) =>  this.componentDidMount()}
                                       className="list-group-item list-group-item-action bg-white text-dark "> <i
                                        className="pi pi-list" style={{ padding : '0px 5px'}}></i> All Products </a>
                                    {
                                        this.state.category.map((value, index1) => {
                                            return (
                                                <a href="#" onClick={(e) =>  this.priductViewByCategoryId(value._id)} className="list-group-item list-group-item-action bg-white text-dark">
                                                    <i className="pi pi-list" style={{ padding : '0px 5px'}}></i>
                                                    {value.title}</a>
                                            )

                                        })

                                    }

                                </div>
                            </div>

                        </div>
                        <div className="row mt-3">

                          {

                              this.state.products.map((value, index) => {

                                  return(

                                      <div className="col-md-4">
                                          <Singleproductcard
                                              products = {value}
                                          />
                                      </div>
                                  )
                              })
                          }

                      </div>
                    </div>
                </section>
                <Footer />
            </>

        );
    }


}

 AllProductsClient.propTypes = {
     logoutUser: PropTypes.func,
     auth: PropTypes.object.isRequired,
     cart: PropTypes.object.isRequired
 };

 const mapStateToProps = state => ({
     auth: state.auth,
     cart: state.cart
 });

 export default connect(
     mapStateToProps,
     { logoutUser })
 (AllProductsClient);

