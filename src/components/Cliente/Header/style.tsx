import { Color } from "@styles/color";
import styled from "styled-components";

export const SHeader = styled.header`
  width: 100%;
  background-color: ${Color.Pricipal};
  flex-direction: row;
  align-items: center;
  border-bottom: 0.5px solid #0000001f;
  justify-content: center;
  padding: 1rem 0 1rem 0;
  position: fixed;
  top: 0%;
  z-index: 20;

  .con {
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .hamburger{
    cursor: pointer;
    color: ${Color.Text}
  }

  .avatar {
    display: none;
  }
  
  .concarrito {
    flex-direction: row;
    align-items: center;
  }

  .carritonoti {
    position: absolute;
    top: -4px;
    right: -2px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${Color.One};
  }

  .concarritoprecio {
    margin-left: 4px;
  }
  .carritoprecio {
    height: 16px;
  }

  .carritoprecio .name {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
  }
  .carritoprecio .precio {
    font-size: 10px;
    line-height: 15px;
    font-weight: 500;
  }
  .mas {
    height: 11px;
  }

  .btnrorl {
    flex-direction: row;
    gap: 8px;
  }

  .order-cart-noti {
    flex-direction: row;
    gap: 1em;
  }

  .btnrorl button {
    border: none;
    border-radius: 2px;
    padding: 5px;
    font-family: "Nova Slim", cursive;
    font-size: 14px;
    box-shadow: 5px 5px 5px 0px lightgray;
  }

  .btnlogin {
    background-color: ${Color.One};
    color: ${Color.Pricipal};
  }
  
  @media only screen and (min-width: 765px) {
    .con {
      width: 70%;
    }
    .hamburger {
          display: none;
        }

        .avatar {
          display: flex;
        }
    }

`;

export const StyleNav = styled.div`
  padding: 1rem;
  min-width: 200px;
  align-items: center;

  .close {
    align-self: end;
    cursor: pointer;
    color: ${Color.Text};
  }

  nav {
    color: ${Color.Text};
    font-size: .9rem;
    font-weight: bolder;
    margin-top: 10px;
  }

  nav ul li{
    margin-bottom: 7px;
  }
`
