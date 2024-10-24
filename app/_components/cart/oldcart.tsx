        {/* <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">Código de descuento</h4> */}
        <section className="bg-neutral-100 md:flex-1 px-12 py-[122px] flex flex-col gap-5 md:overflow-y-scroll no-scrollbar">
          {items.length === 0 ? (
            <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
              No hay productos en el carrito
            </h3>
          ) : (
            <>
              <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
                Resúmen de la compra
              </h3>
              <ul className="flex flex-col  gap-4">
                {items.map((item) => {
                  return <ProductItem key={item.variantId} item={item} />;
                })}
              </ul>

              <section className="flex flex-col items-end gap-2">
                {showDiscountCode && <CodigoDeDescuento />}

                <div className="flex w-full justify-between">
                  <input
                    type="text"
                    value={JSON.stringify(items)}
                    name="items"
                    hidden
                    readOnly
                  />
                  <input
                    readOnly
                    hidden
                    name="reference"
                    value={payment_reference}
                    type="text"
                  />
                  <input
                    readOnly
                    hidden
                    name="subtotal"
                    value={getCartTotalWithoutDiscountsOrTax()}
                    type="number"
                  />
                  <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                    Subtotal
                  </h5>
                  <span>
                    $
                    {numberToColombianPriceString(
                      getCartTotalWithoutDiscountsOrTax()
                    )}
                  </span>
                </div>
                <label className="flex w-full justify-between">
                  <input
                    hidden
                    name="discount"
                    value={getProductDiscountAmount()}
                    type="number"
                    readOnly
                  />
                  <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                    Descuento
                  </h5>
                  <span>
                    ${numberToColombianPriceString(getProductDiscountAmount()) || 0}
                  </span>
                </label>
                <label className="flex w-full justify-between">
                  <input
                    type="number"
                    hidden
                    name="tax"
                    value={getCartTax()}
                    readOnly
                  />
                  <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                    IVA
                  </h5>
                  <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
                </label>
                <label className="flex w-full justify-between">
                  <input
                    type="number"
                    hidden
                    name="shipping"
                    readOnly
                    value={0}
                  />
                  <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                    Envío
                  </h5>
                  <span>Gratis</span>
                </label>
                <div className="self-stretch h-px bg-stone-300" />

                <label className="flex w-full justify-between">
                  <input
                    readOnly
                    hidden
                    type="number"
                    name="total"
                    value={getCartTotal()}
                  />
                  <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                    Total
                  </h5>
                  <span>${numberToColombianPriceString(getCartTotal())}</span>
                </label>
                {/* <label className="flex w-full justify-between">
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              id
              </h5>
              <span>{id}</span>
            </label> */}
                <Button
                  type="submit"
                  labelType={"dark"}
                  // onClick={() => formState && formState.data && setIsWompipaymentOpen(true)}
                  onClick={() => {
                    const externalId = getOrSetExternalIdPixel();
                    initiatePixelCheckoutView(pixelInfo, externalId);
                    setPaymentLoading(true);
                  }}
                  className="flex justify-center items-center gap-2 w-full max-w-sm button-float"
                >
                  {paymentLoading ? <SmallWhiteSpinner/> : (
                    <>
                    <MdOutlinePayments className="text-base" />
                    <span className="font-inter text-base font-medium leading-6">
                    Ir a pagar
                    </span>
                    </>
                   )}
                </Button>

                {formState && formState.error ? (
                  <p className="text-red-500 text-sm">
                    {formState.error}
                  </p>
                ) : 
                (
                  isWompipaymentOpen && (
                    <MenuModal isMenuOpen={isWompipaymentOpen} >
                      <section className=" relative z-10 h-full w-full flex items-center justify-center default-paddings">
                        <section
                          ref={wompiRef}
                          className="w-full max-w-screen-xs z-[102] pointer-events-auto px-8 pt-4 pb-3 bg-white flex flex-col items-center justify-center gap-4 "
                        >
                          <header className="flex w-full justify-center relative">
                            <h2 className="leading-none text-xl md:text-2xl md:leading-none font-bold font-tajawal text-gray-800">
                              Confirma tus datos
                            </h2>
                            <IoMdClose
                              className="text-lg cursor-pointer absolute right-0"
                              onClick={() => setIsWompipaymentOpen(false)}
                            />
                          </header>
                          {formState?.data && (
                            <div className="w-full flex flex-col gap-3 font-tajawal">
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Nombre:</p>
                                <p>{formState?.data?.customer.name}</p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>
                                  {formState?.data?.customer.id.type.toUpperCase()}:{" "}
                                </p>
                                <p>{formState?.data?.customer.id.number}</p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Correo electrónico: </p>
                                <p>{formState?.data?.customer.email}</p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Teléfono:</p>
                                <p> {formState?.data?.customer.phone}</p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Dirección: </p>
                                <p>
                                  {formState?.data?.customer.addressObject?.address}
                                </p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Código Postal:</p>
                                <p>
                                  {
                                    formState?.data?.customer.addressObject
                                      ?.postalCode || ""
                                  }
                                </p>
                              </div>
                              <div className="flex w-full justify-end border-b border-stone-200">
                                <p>
                                  {formState?.data?.customer.addressObject?.city} -{" "}
                                  {
                                    formState?.data?.customer.addressObject
                                      ?.department
                                  }{" "}
                                  /{" "}
                                  {formState?.data?.customer.addressObject?.country}
                                </p>
                              </div>
                              <div className="flex w-full justify-between border-b border-stone-200">
                                <p>Total a pagar: </p>
                                <p>
                                  ${numberToColombianPriceString(getCartTotal())}
                                </p>
                              </div>
                            </div>
                          )}
                          <WompiPayButton
                            disabled={formState?.data ? false : true}
                            amount={getCartTotal()}
                            reference={payment_reference}
                            redirectUrl={`${baseUrl}/success/${payment_reference}`}
                          />
                          {formState && formState.data && (
                            <>
                            <button 
                              className="dark-button flex gap-2 justify-center items-center" 
                              disabled={!addiDisabled} 
                              type="button" 
                              onClick={() => initiateAddiPayment(formState.data)}
                            >
                            <MdOutlinePayments className="text-base" /> Paga a cuotas con Addi <FaArrowRight className="text-base" />
                           </button>
                            {!addiDisabled && (
                              <span className="-mt-4 ml-2 text-xs text-red-500">
                                * El monto para pago con Addi debe estar entre ${formState.data.addiAmounts?.minAmount && numberToColombianPriceString( formState.data.addiAmounts?.minAmount)} y ${formState.data.addiAmounts?.maxAmount && numberToColombianPriceString( formState.data.addiAmounts?.maxAmount)}
                              </span>
                            )}
                          </>
                          )}
                          <footer>
                            <div className="w-[5.5rem]">
                              <ArleBasicLogo />
                            </div>
                          </footer>
                        </section>
                      </section>
                    </MenuModal>
                  )
                )}
              </section>
            </>


{showDiscountCode && <CodigoDeDescuento />}