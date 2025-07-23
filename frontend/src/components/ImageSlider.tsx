import { StyleSheet,  View } from 'react-native'
import React from 'react'
import ImageSliderPackage from '@coder-shubh/react-native-image-slider';


type ImageSliderProp = {
  imageLists: string[]
}
const ImageSlider: React.FC<ImageSliderProp> = ({
  imageLists
}) => {
  return (
    <View style={styles.imageSliderContainer}>
      <ImageSliderPackage
        testID="ImageSlider_testID"
        images={imageLists}
        imageHeight={290}
        dotSize={10}
        dotColor='silver'
        activeDotColor='blue'
        showNavigationButtons={false}
        showIndicatorDots={true}
        imageLabel={false}
        label='Example Label'
        extrapolate='clamp'
        autoSlideInterval={50 * 1000}
        containerStyle={styles.sliderContainer}
        radius={10}
      />
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
  imageSliderContainer: {
    position: 'relative',
    paddingBlockEnd: 20
  },
  sliderContainer: {
    marginBottom: -7
  }
})