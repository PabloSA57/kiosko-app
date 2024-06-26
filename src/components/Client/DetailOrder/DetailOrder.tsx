import React, { useEffect, useState } from "react";
import DetailOrderStyle from "./style";
import { MdAccessTime, MdOutlinePaid } from "react-icons/md";
import { PayService } from "@service/pay";
import { WrapperFlex } from "@components/General/Wrapper/Wrapper";
import TableProducts from "@components/General/TableProducts/TableProducts";
import CardInfo from "@components/General/CardInfo/CardInfo";
import { BiLoader, BiStoreAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { OrderService } from "@service/order";
import time from "@utils/time";
import socket from "@lib/socket";
import Loader from "@components/General/Loader/Loader";

const payService = new PayService();
const orderService = new OrderService();

const DetailOrder = ({ order }: { order: TOrder }) => {
  const n_order = order.id.slice(0, 7);
  const router = useRouter();
  const dateOrder = time(order.date);
  const [status, setStatus] = useState<TStatus>("typing");
  const [state, setState] = useState(order?.state);

  useEffect(() => {
    setState(order.state);
  }, [order.state]);

  const handlePay = async () => {
    setStatus("loading");
    const products = order.orderproduct.map((p) => {
      const { id, price, name, quantity, category_name, imgurl } = p;
      return {
        id,
        name,
        imgurl,
        category: category_name,
        price,
        quantity,
      };
    });
    try {
      const response = await payService.pay(
        products,
        order.store.id,
        order.id,
        order.customer.id
      );

      router.push(response.data.init_point);
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  const handleCancel = async () => {
    setStatus("loading");
    try {
      await orderService.update({ state: "cancelled" }, order.id);
      setStatus("success");
      socket.emit(
        "notification",
        { msg: "Se cancelo una orden" },
        order.store.id
      );

      setState("cancelled");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <DetailOrderStyle>
      <header className="header">
        <div className="cont">
          <WrapperFlex $width="fit-content">
            <h4>N° Orden: {n_order}</h4>
            <WrapperFlex $flexdirection="row" $gap="0.5rem">
              <p className={`state-order ${state}`}>
                {state === "pendding" && "Pendiente"}
                {state === "cancelled" && "Cancelada"}
                {state === "success" && "Aprobada"}
              </p>
              <p
                className={`state-paid ${order.paid ? "success" : "cancelled"}`}
              >
                {order.paid ? "Pagada" : "No pagada"}
              </p>
            </WrapperFlex>
          </WrapperFlex>

          {order.paymentType === "mp" && state === "success" && !order.paid && (
            <button
              disabled={status === "loading"}
              className="btn-mp"
              onClick={handlePay}
            >
              {status === "loading" ? (
                <Loader>
                  <BiLoader />
                </Loader>
              ) : (
                "Pagar"
              )}
            </button>
          )}
          {state === "pendding" && (
            <button
              disabled={status === "loading"}
              className="btn-cancel"
              onClick={handleCancel}
            >
              {status === "loading" ? (
                <CircularProgress size="small" />
              ) : (
                "Cancelar"
              )}
            </button>
          )}
        </div>
      </header>
      <div className="container">
        <WrapperFlex className="order-info">
          <h4>Informacion de la orden</h4>
          <WrapperFlex
            $flexdirection="row"
            $justifycontent="space-between"
            $margin=".9rem 0"
          >
            <CardInfo
              title="Kiosko"
              info={order.store.name}
              icon={<BiStoreAlt />}
            />
            <CardInfo title="Tiempo" info={dateOrder} icon={<MdAccessTime />} />
            <CardInfo
              title="Pago"
              info={
                order.store.payment_type === "mp" ? "Mercado Pago" : "Efectivo"
              }
              icon={<MdOutlinePaid />}
            />
          </WrapperFlex>
        </WrapperFlex>
        <div className="products">
          <h4>Productos de la orden</h4>
          <WrapperFlex $overflow="auto">
            <TableProducts products={order.orderproduct} />
          </WrapperFlex>

          <WrapperFlex $flexdirection="row" $justifycontent="space-between">
            <h4>Total:</h4>
            <h4>${order.amount}</h4>
          </WrapperFlex>
        </div>
      </div>
    </DetailOrderStyle>
  );
};

export default DetailOrder;
