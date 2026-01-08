declare module 'react-card-slider-component' {
    interface Slide {
        image: string;
        title: string;
        description: string;
        clickEvent?: (event: React.MouseEvent<HTMLDivElement>) => void;
    }

    interface ReactCardSliderProps {
        slides: Slide[];
    }

    const ReactCardSlider: React.FC<ReactCardSliderProps>;

    export default ReactCardSlider;
}