import { DOMElement, useEffect, useState } from "react";

const usedAnswers: number[] = [];
let tries = 1

interface data {
    name: string;
    item: string;
    pic: string,
    slug: string,
}

const countOfItemsInSlug = (data: data[], slug: string): number => {
    let counterOfItems = 0;

    data.map((element, index) => {
        if(!usedAnswers.includes(index) && element.slug === slug) {
            counterOfItems += 1
        }
    })

    return counterOfItems
}

const doesSlugAvaliable = (data: data[], slug: string): boolean => {
    return data.some((element, index) => {
        return !usedAnswers.includes(index) && element["slug"] === slug
    })
}

export default function ChooseManyPage() {
    const [isGameGoing, setIsGameGoing] = useState(true)
    const [timeLeft, setTimeLeft] = useState(60)
    const [round, setRound] = useState<number>(0)

    const [data, setData] = useState<data[] | null>(null);

    const [article, setArticle] = useState("")
    const [picturesElements, setPicturesElements] = useState<JSX.Element[]>([])

    let answerTargetSlug: string;

    let answers: number[] = [];
    const [ansersLength, setAnswersLength] = useState(0)

    const [score, setScore] = useState(0)
    
    useEffect(() => {
        fetch("/era.json")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const reselectAnswers = () => {
        if (data && data.length > usedAnswers.length) {
            // TRIES RECOVER
            tries = 1
            answers = []
            
            // SELECT RANDOM SLUG FOR ASNWERS
            let random_slug_select

            do {
                random_slug_select = Math.floor(Math.random() * data.length)
            }
            while (
                answerTargetSlug == null && 
                !doesSlugAvaliable(data, data[random_slug_select].slug)
            )

            answerTargetSlug = data[random_slug_select].slug
            setArticle(data[random_slug_select].name)
            const answerTargetSlugVar = data[random_slug_select].slug
            
            // SELECT INDEXES FOR ANSWERS
            const indexes_of_answers: number[] = [];

            while (indexes_of_answers.length < Math.round(countOfItemsInSlug(data, answerTargetSlugVar)/2)) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (
                    !usedAnswers.includes(randomIndex) && 
                    !indexes_of_answers.includes(randomIndex) &&
                    data[randomIndex].slug == answerTargetSlugVar
                ) {
                    console.log(!usedAnswers.includes(randomIndex), !indexes_of_answers.includes(randomIndex), data[randomIndex].slug == answerTargetSlugVar)
                    indexes_of_answers.push(randomIndex);
                }
            }

            usedAnswers.push(...indexes_of_answers);
            answers.push(...indexes_of_answers);
            setAnswersLength(indexes_of_answers.length)
            randomPictures(indexes_of_answers)
        } 
        else if (data) {
            setIsGameGoing(false);
        }
    };

    useEffect(() => reselectAnswers(), [data])

    const randomPictures = (indexes_of_answers: number[]) => {
        console.log(`used: ${usedAnswers}`)
        if (data) {
            const random_indexes_for_pictures: number[] = [];
            let attemps_to_rand_ind = 0
            while (random_indexes_for_pictures.length < 9 && attemps_to_rand_ind < (data.length * 2)) {
                let this_index_of_picture;
                do {
                    this_index_of_picture = Math.floor(Math.random() * data.length);
                    attemps_to_rand_ind += 1
                } while (
                    (random_indexes_for_pictures.includes(this_index_of_picture) ||
                    usedAnswers.includes(this_index_of_picture)) && attemps_to_rand_ind < (data.length * 2)
                );
                if (
                    !random_indexes_for_pictures.includes(this_index_of_picture) && 
                    !usedAnswers.includes(this_index_of_picture)
                ) {
                    random_indexes_for_pictures.push(this_index_of_picture);
                }
            }
            const usedPositions = new Set();
            if(indexes_of_answers.length > 0) {
                indexes_of_answers.forEach(answer => {
                    let randomPosition
                    do {
                        randomPosition = Math.floor(Math.random() * random_indexes_for_pictures.length)
                    }
                    while (usedPositions.has(randomPosition))

                    random_indexes_for_pictures[randomPosition] = answer;
                    usedPositions.add(randomPosition)

                    console.log(randomPosition+1, indexes_of_answers, random_indexes_for_pictures)
                });
            
                const elements = random_indexes_for_pictures.map((index) => (
                    <div onClick={(e) => logic(data[index].slug, e)} data-index={index} data-slug={data[index].slug} data-item={data[index].item} className="imageCard" style={{ backgroundImage: `url(${data[index].pic ? data[index].pic : "/vite.svg"})`}} key={index}>
                        <div className="imageCardIn" style={{ backgroundImage: `url(${data[index].pic ? data[index].pic : "/vite.svg"})`}}></div>
                    </div>
                ))
                setPicturesElements(elements)
                setRound(round + 1)
                
            }
            else {
                setIsGameGoing(false)
                console.log("no answers")
            }
            const clearTheElementsFromSelection = document.querySelectorAll(".imageCard")
            if(clearTheElementsFromSelection) {
                clearTheElementsFromSelection.forEach(e => {
                    if(e.classList.contains("selected-element")) {
                        e.classList.remove("selected-element")
                    }
                })
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsGameGoing(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const logic = (userAnswer: string, e: DOMElement) => {
        if(userAnswer == answerTargetSlug && !e.target.classList.contains("selected-element") && tries <= answers.length) {
            e.target.classList.add("selected-element")
            setScore(prevScore => prevScore + 10);
            tries += 1
            console.log(tries, answers.length, 'added', )
        }
        else if(userAnswer != answerTargetSlug && !e.target.classList.contains("selected-element") && tries <= answers.length) {
            e.target.classList.add("selected-element")
            tries += 1
            console.log(tries, answers.length, 'xyi')
        }
        if (tries > answers.length) {
            reselectAnswers()
        }
    }

    return isGameGoing ? (
        <>
            <h1>Оберіть предмети які відносяться до</h1>
            <h2 key={article}>{article}</h2>
            <h2 className="timer">Залишилось часу: {timeLeft}</h2>
            <h3>кількість вірних відповідей на екрані: {ansersLength}</h3>
            <div className="imageContainer">
                {picturesElements}
            </div>
            <a href="/">В меню</a>
        </>
    ) : (
        <>
            <h1>Кінець</h1>
            <h2>Ви набрали {score} птс</h2>
            <a href="/">В меню</a>
        </>
    );
}
