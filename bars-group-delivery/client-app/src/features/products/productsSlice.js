import { createSelector, createSlice } from "@reduxjs/toolkit";

const Status = {
    Idle: 'idle',
    Loading: 'loading',
    Succeeded: 'succeeded',
    Failed: 'failed',
}

const createProduct = (id, price, title, ingredients, weight = 0, kcal = 0, carbs = 0, proteins = 0, fats = 0) => {
    return (
        {
            id,
            price,
            title,
            ingredients: [...ingredients],
            weight,
            kcal,
            carbs,
            proteins,
            fats
        }
    );
}
const initialState = {
    status: Status.Idle,
    entities: { },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoading(state, action) {
            state.status = Status.Loading;
        },
        productsLoaded(state, action) {
            const newEntities = {};
            action.payload.forEach((product) => {
                newEntities[product.id] = product;
            });
            state.entities = newEntities;
            state.status = Status.Idle;
        }
    }
})

export const { productsLoading, productsLoaded } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
    dispatch(productsLoading());

    await setTimeout(() => {
        const products = [
            createProduct(1,490, 'ПИТА С НАЧИНКОЙ', 
            ['растительная котлета со вкусом говядины «Hi»', 'соус «Тартар»', 'салат айсберг', 'помидоры', 'салат «Коул Слоу»', 'лук красный', 'соус «Сырный»', 'пшеничная пита']),
            createProduct(2, 350, 'ЛИМОННЫЙ ПИРОГ', 
            [...'вода питьевая, мука пшеничная, сахар, масло подсолнечное рафинированное, лимон, крахмал кукурузный, лепестки арахиса обжаренные, сода пищевая, регулятор кислотности кислота лимонная'.split(', ')]),
            createProduct(3,1990 , 'БУРГЕР ДЕЛЮКС', 
            [...'булочка с кунжутом, соус «Цезарь», постный сыр «Чеддер», растительная котлета со вкусом говядины, лук, корнишоны, айсберг, соус «Сальса'.split(', ')]),
            createProduct(5,250, 'ЗЕФИР В ШОКОЛАДЕ ТЁМНЫЙ', 
            ['мука (рисовая, амарантовая, льняная)', ...'кокосовый сахар, какао порошок, рисовое молоко, кокосовое масло, сок лимона, сироп топинамбура, пищевая сода, аквафаба, агар-агар, какао-масло, какао тертое, кешью, мука из зелёной гречки, мескит'.split(', ')],
            60, 267.7, 35.5, 5.7, 11.7),
            createProduct(6,343 , 'СОЕВЫЙ СЭНДВИЧ-МОРОЖЕНОЕ С ВАНИЛЬНЫМ ПЛОМБИРОМ', 
            ['соевое молоко(вода, соевые бобы)', 'растительные сливки (вода, растительное масло, стабилизатор, эмульгатор, ароматизатор, соль)', ...'сахар, картофельный крахмал, кокосовое масло, мука пшеничная, кешью, какао тертое, какао-масло, соль, ароматизатор «Ваниль»'.split(', ')],
            120, 350, 43, 3, 18),
        ];
        let response = { products };
        dispatch(productsLoaded(response.products));
    }, 1000);
}

const selectProductEntities = state => state.products.entities;

export const selectProducts = createSelector(
    selectProductEntities,
    (entities) => Object.values(entities)
)

export const selectProductById = (state, productId) => {
    return selectProductEntities(state)[productId];
}

export const selectProductIds = createSelector(
    selectProducts,
    (products) => products.map(item => item.id)
)