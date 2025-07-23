import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { categories, COLORS, FONT_FAMILY, homeTitle, ProductDataSample } from '../constants'
import { MotiView } from 'moti'
import { Search, X } from 'lucide-react-native'
import ProductCard from '../components/ProductCard'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppRootState, useAppDispatch, useAppSelector } from '../store'

// ["find", "your", "next"]
type HomeScreenPropType = NativeStackNavigationProp<RootStackParamList, "MainTabs">
const HomeScreen = () => {
    const animatedTitle = [...homeTitle.split(" "), '"'].filter(word => word !== '"')
    const [searchText, setSearchText] = useState('')
    const navigation = useNavigation<HomeScreenPropType>()
    // use selector...
    const dispatch = useAppDispatch()
    const totalProduct = useAppSelector((state: AppRootState) => state.cart.cartList)
    const [selectedCategory, setSelectedCategory] = useState({
        index: 0,
        category: categories[0],
    });
    const [step, setStep] = useState(0)
    // small delay before creating first animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1)
        }, 200)
        return () => clearTimeout(timer)
    }, [])
    // filtered data
    const AllCategories = selectedCategory.category === 'All'
    const filteredProductsWithCategory = ProductDataSample.filter(item => AllCategories ? item : item.category === selectedCategory.category)
    const filteredProductsWithSearch = filteredProductsWithCategory.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))


    // add item to the cart
    const handleAddItemToTheCart = (product: any) => {
        dispatch({
            type: 'cart/addToCart',
            payload: {
                ...product,
                selectedSize: "S"
            }
        })
        console.log(totalProduct);
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* Title */}
                <View style={styles.TitleContainer}>
                    {animatedTitle.map((text, index) => {
                        return (
                            <MotiView
                                key={index}
                                from={{
                                    opacity: 0,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0,
                                }}
                                onDidAnimate={(key, finished) => {
                                    if (key === 'opacity' && finished && step === 1) {
                                        setStep(2) // trigger next step
                                    }
                                }}


                                transition={{
                                    type: 'spring',
                                    delay: index * 250,
                                }}>
                                <Text style={styles.titleText}>
                                    {text}
                                </Text>
                            </MotiView>
                        );
                    })}
                </View>

                {/* Search Input */}
                <MotiView

                    from={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.5 }}
                    onDidAnimate={(key, finished) => {
                        if (key === 'opacity' && finished && step === 2) {
                            setStep(3) // trigger next step
                        }
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 50,
                        delay: 300,
                    }}

                    style={styles.inputContainer}>
                    <TouchableOpacity
                        disabled
                    >
                        <Search
                            style={styles.Icon}
                            size={18}
                            color={
                                searchText.length > 0
                                    ? COLORS.primaryOrange
                                    : COLORS.primaryLightGrey
                            }
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find Your Product..."
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                        }}
                        placeholderTextColor={COLORS.primaryLightGrey}
                        style={styles.textInput}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                setSearchText('')
                            }}>
                            <X
                                style={styles.Icon}
                                size={16}
                                color={COLORS.primaryLightGrey}
                            />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </MotiView>
                <View>

                    {/* Category Filter */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.CategoryContainerStyle}
                        data={categories}
                        renderItem={({ index, item }) => (
                            <MotiView

                                from={{
                                    opacity: 0,
                                    translateY: 10,
                                }}
                                animate={{ opacity: step >= 3 ? 1 : 0, translateY: step >= 3 ? 0 : 10 }}

                                onDidAnimate={(key, finished) => {
                                    if (key === 'opacity' && finished && step === 3) {
                                        setStep(4) // trigger next step
                                    }
                                }}
                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                    stiffness: 150,
                                    delay: index * 200
                                }}
                                key={index.toString()}
                                style={styles.CategoryAnimatedView}>
                                <TouchableOpacity
                                    style={styles.CategoryButton}
                                    onPress={() => {
                                        setSelectedCategory({ index: index, category: categories[index] });
                                    }}>
                                    <Text
                                        style={[
                                            styles.CategoryTitle,
                                            { color: selectedCategory.index === index ? COLORS.primaryOrange : COLORS.primaryLightGrey }
                                        ]}>
                                        {item}
                                    </Text>
                                    {/* circle */}
                                    {selectedCategory.index === index && (
                                        <MotiView
                                            from={{
                                                opacity: 0,
                                                translateY: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                translateY: 0,
                                            }}
                                            transition={{ type: 'spring', damping: 12 }}
                                            style={styles.ActiveCircle}
                                        />
                                    )}
                                </TouchableOpacity>
                            </MotiView>
                        )}
                    />


                    {/* Products Section */}
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={filteredProductsWithSearch}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        ListEmptyComponent={() => (
                            <MotiView
                                from={{
                                    opacity: 0,
                                    translateY: 15,
                                }}
                                animate={{
                                    opacity: step >= 4 ? 1 : 0,
                                    translateY: step >= 4 ? 0 : 15,
                                }}

                                style={styles.EmptyListContainer}
                            >
                                <Text style={styles.CategoryTitle}>No Product Available</Text>
                            </MotiView>
                        )}
                        numColumns={2}
                        contentContainerStyle={styles.ProductContainerFlatlist}
                        keyExtractor={item => item.name}
                        renderItem={({ index, item }) => {
                            const isLeftColumn = index % 2 === 0 // -> 1, 3, 5, .....
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProductDetails', { _id: item._id })}
                                >
                                    <MotiView
                                        from={{
                                            opacity: 0,
                                            translateY: 15,
                                        }}
                                        animate={{
                                            opacity: step >= 4 ? 1 : 0,
                                            translateY: step >= 4 ? 0 : 15,
                                            marginRight: isLeftColumn ? 22 : 0
                                        }}
                                        onDidAnimate={(key, finished) => {
                                            if (key === 'opacity' && finished && step === 4) {
                                                setStep(5) // trigger next step
                                            }
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 30,
                                            delay: index * 200,
                                        }}
                                    >
                                        <ProductCard
                                            _id={item._id}
                                            image={item.images[0]}
                                            name={item.name}
                                            brand={item.brand}
                                            average_rate={item.average_rating}
                                            price={item.prices[0].price}
                                            onPress={() => handleAddItemToTheCart(item)}
                                        />
                                    </MotiView>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryWhite,
    },
    titleText: {
        fontSize: 28,
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryBlack,
        paddingLeft: 8
    },
    TitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        rowGap: 3,
        flexWrap: 'wrap',
        paddingHorizontal: 20
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.primaryVeryWhite,
        borderRadius: 20,
        margin: 30,
        alignItems: 'center',
    },
    Icon: {
        marginHorizontal: 20,
    },
    textInput: {
        flex: 1,
        height: 60,
        fontFamily: FONT_FAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.primaryDarkGrey,
    },
    CategoryContainerStyle: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    CategoryAnimatedView: {
        paddingHorizontal: 15,
    },
    CategoryButton: {
        alignItems: 'center',
    },
    CategoryTitle: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        fontSize: 16,
        marginBottom: 4,
    },
    ActiveCircle: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primaryOrange,
    },
    ProductContainerFlatlist: {
        // gap: 20,
        paddingVertical: 20,
        paddingBottom: 180,
        paddingHorizontal: 30,
        // display: 'flex',
        // alignItems: 'baseline',
        // justifyContent: 'flex-start',
        // flexWrap: 'wrap',
        // flex: 1,
        // flexDirection: 'row'

    },
    EmptyListContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80
    },
    scrollView: {
        flexGrow: 1,
        flex: 1,
        minHeight: Dimensions.get('window').height
    }
});

export default HomeScreen;

