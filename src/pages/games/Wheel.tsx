import { useEffect, useState } from "react";

const usedAnswers: number[] = [];
let tries = 0

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

export default function Wheel() {
    const [isGameGoing, setIsGameGoing] = useState(true)
    const [timeLeft, setTimeLeft] = useState(60)
    const [triesLeft, setTriesLeft] = useState(0)
    const [article, setArticle] = useState("")

    const [data, setData] = useState<data[] | null>(null);
    const [wheelElements, setWheelElements] = useState<JSX.Element[]>([])

    const [answerTargetSlug, setAnswerTargetSlug] = useState<string | null>(null)
    const [answers, setAnswers] = useState<number[]>([]);

    const [score, setScore] = useState(0)
    
    useEffect(() => {
        fetch("/era.json")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                setTriesLeft(jsonData.length / 3 - tries + 1)
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const reselectAnswers = () => {
        if (data && data.length > usedAnswers.length) {   
            // SELECT RANDOM SLUG FOR ASNWERS
            let random_slug_select

            do {
                random_slug_select = Math.floor(Math.random() * data.length)
            }
            while (
                answerTargetSlug == null && 
                !doesSlugAvaliable(data, data[random_slug_select].slug)
            )

            setAnswerTargetSlug(data[random_slug_select].slug)
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
                    indexes_of_answers.push(randomIndex);
                }
            }

            usedAnswers.push(...indexes_of_answers);
            
            setAnswers(indexes_of_answers);
            randomPictures()
        } 
        else if (data) {
            setIsGameGoing(false);
        }
    };

    useEffect(() => reselectAnswers(), [data])

    const randomPictures = () => {
        if (data) {
            const random_indexes_for_pictures: number[] = [];

            while (random_indexes_for_pictures.length < 21) {
                let this_index_of_picture;

                do {
                    this_index_of_picture = Math.floor(Math.random() * data.length);
                } while (
                    answerTargetSlug === data[this_index_of_picture].slug ||
                    random_indexes_for_pictures.includes(this_index_of_picture)
                );

                random_indexes_for_pictures.push(this_index_of_picture );
            }

            if(answers) {
                answers.forEach(answer => {
                    const randomPosition = Math.floor(Math.random() * random_indexes_for_pictures.length);
                    random_indexes_for_pictures[randomPosition] = answer;
                });
            }

            const elements = random_indexes_for_pictures.map((index, i) => (
                <div data-slug={data[index].slug} className="imageCardWheel" style={{ backgroundImage: `url(${data[index].pic ? data[index].pic : "/vite.svg"})`}} key={i}>
                    <div className="imageCardWheel-text">{data[index].item}</div>
                </div>
            ))

            setWheelElements(elements)
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

    const logic = () => {
        const wheel = document.querySelector(".wheel") as HTMLElement | null;
        if (wheel) {
            wheel.style.animationPlayState = 'paused';
        }

        const arrowCenter = window.innerWidth / 2;

        if(data && tries >= data?.length / 3) {
            setIsGameGoing(false)
        }

        document.querySelectorAll('.imageCardWheel').forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.left < arrowCenter && rect.right > arrowCenter) {
                if(section.getAttribute("data-slug") == answerTargetSlug) {
                    setScore(prev => prev + 10)
                }
                reselectAnswers()
                tries = tries + 1
                if(data) setTriesLeft((data.length / 3 - tries) + 1)   
                if (wheel) {
                    wheel.style.animationPlayState = 'running';
                }
            }
            else {
                if (wheel) {
                    wheel.style.animationPlayState = 'running';
                }
            }
        });       
    }

    return isGameGoing ? (
        <>
            <h1 key={article}>Оберіть предмети, які відносяться до епохи <b>{article}</b></h1>
            <h2>{score}</h2>
            <h1 className="timer">залишилось {timeLeft}с<br/>спроб: {triesLeft}</h1>
            <div className="wheel-container">
                <div className="wheel-arrow arrow-top"></div>
                <div className="wheel">
                    {wheelElements}
                    {wheelElements}
                </div>
                <div className="wheel-arrow arrow-bot"></div>
            </div>
            <button onClick={() => logic()} className="stopButton">Зупинити</button>
            <a href="/">В меню</a>
        </>
    ) : (
        <>
            <h1>Кінець</h1>
            <h2>Ви набрали {score} балів</h2>
            <a href="/">В меню</a>
        </>
    );
}
