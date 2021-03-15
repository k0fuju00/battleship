import React, { useState, useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native'
import styles from '../style/style'
import Entypo from '@expo/vector-icons/Entypo';



const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
const bombs = 15;
const ships = 3;
const hits = 0;
const sec = 0;

let initialBoard = [
    START, START, START, START, START,
    START, START, START, START, START,
    START, START, START, START, START,
    START, START, START, START, START,
    START, START, START, START, START];



export default function Gameboard() {

    let intervalId = useRef(null)
    const [amounthits, setamounthits] = useState(hits);
    const [amountbombs, setamountbombs] = useState(bombs);
    const [amountships, setAmountships] = useState(ships);
    const [board, setboard] = useState(initialBoard);
    const [buttonText, setbuttonText] = useState("Start Game");
    const [seconds, setSeconds] = useState(sec);
    const [positionships, setpositionships] = useState(null);
    const [gameStatus, setgameStatus] = useState("Game has not started");
    const [gameStarted, setgameStarted] = useState(false)
    const [gameDone, setGameDone] = useState(false)
    const [WinLose, setWinLose] = useState(false)

    function chooseItemColor(number) {
        if (board[number] === CROSS) {
            return "#FF3031"
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30"
        } else if (board[number] === START) {
            return "#74B9FF"
        }
    }



    function drawItem(number) {
        //console.log(positionships);
        if (!gameStarted) {
            setgameStatus("Click the start button first")
        } else if (gameDone) {
            console.log("game done")
        } else {
            if (WinLose) {
                if (amountbombs != 0) {
                    setamountbombs(bombs => bombs - 1)
                }
                if (board[number] === START) {
                    board[number] = CROSS;
                    for (let i = 0; i < 3; i++) {
                        console.log(positionships[i]);
                        if (positionships[i] === number) {
                            board[number] = CIRCLE;
                            setamounthits(amounthits => amounthits + 1);
                            setAmountships(amountships => amountships - 1)


                        }
                    }

                }

            }

        }

    }

    useEffect(() => {
        checkWinner();
        if (!gameStarted) {
            setgameStatus("Game has not started")
        }



    }, [seconds])

    function checkWinner() {
        if (amountships === 0 && seconds > 0 && amountbombs > 0) {
            setgameStatus("You sinked all ships")
            setWinLose(false);
            setGameDone(true);
            clearInterval(intervalId.current);


        } else if (amountbombs <= 0 && seconds > 0 && amountships > 0) {
            setgameStatus("Game over. Ships remaining")
            setWinLose(false);
            setGameDone(true);
            clearInterval(intervalId.current);


        } else if (seconds >= 30 && amountships > 0) {
            setgameStatus("Timeout. Ships remaining")
            setWinLose(false);
            setGameDone(true);
            clearInterval(intervalId.current);


        } else {
            setgameStatus("Game is on...")
            setWinLose(true);
            setGameDone(false);

        }

    }

    function makeShips() {
        const positions = [];
        let random;
        for (let i = 0; i < 3; i++) {
            //do while for not generating the same positions 
            do {
                random = Math.floor(Math.random() * 24);

            } while (positions.indexOf(random) != -1)

            positions.push(random);
        }
        setpositionships(positions);
    }

    function startGame() {
        makeShips();
        Timer();
        setWinLose(true);
        setgameStatus("Game is on...");
        setbuttonText("New game");
        setgameStarted(true);

    }

    function Timer() {
        intervalId.current = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if (seconds >= 30) {
                clearInterval(intervalId.current);
                outofTime();
            }

        }, 1000);


    }


    function outofTime() {
        setgameStatus("Timeout. Ships remaining")
        setGameDone(true);
    }

    function startOrNewGame() {
        if (gameStatus === "Game has not started" || gameStatus === "Click the start button first") {
            startGame();
        } else if (gameStatus === "Game is on..." || "You sinked all ships" || "Game over. Ships remaining") {
            resetGame();
        }
    }

    function resetGame() {
        makeShips();
        setamountbombs(15);
        setamounthits(0);
        setAmountships(3)
        setSeconds(0);
        setbuttonText("Start game")
        setgameStatus("Game has not started")
        setgameStarted(false);
        setGameDone(false);
        clearInterval(intervalId.current);
        resetBoard();

    }

    function resetBoard() {
        let initialBoardReset = [
            START, START, START, START, START,
            START, START, START, START, START,
            START, START, START, START, START,
            START, START, START, START, START,
            START, START, START, START, START];
        setboard(initialBoardReset);

    }


    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>
                <Pressable key={0} style={styles.row} onPress={() => drawItem(0)}>
                    <Entypo key={0} name={board[0]} size={32} color={chooseItemColor(0)} />
                </Pressable>
                <Pressable key={1} style={styles.row} onPress={() => drawItem(1)}>
                    <Entypo key={1} name={board[1]} size={32} color={chooseItemColor(1)} />
                </Pressable>
                <Pressable key={2} style={styles.row} onPress={() => drawItem(2)}>
                    <Entypo key={2} name={board[2]} size={32} color={chooseItemColor(2)} />
                </Pressable>
                <Pressable key={3} style={styles.row} onPress={() => drawItem(3)}>
                    <Entypo key={3} name={board[3]} size={32} color={chooseItemColor(3)} />
                </Pressable>
                <Pressable key={4} style={styles.row} onPress={() => drawItem(4)}>
                    <Entypo key={4} name={board[4]} size={32} color={chooseItemColor(4)} />
                </Pressable>
            </View>

            <View style={styles.flex}>
                <Pressable key={5} style={styles.row} onPress={() => drawItem(5)}>
                    <Entypo key={5} name={board[5]} size={32} color={chooseItemColor(5)} />
                </Pressable>
                <Pressable key={6} style={styles.row} onPress={() => drawItem(6)}>
                    <Entypo key={6} name={board[6]} size={32} color={chooseItemColor(6)} />
                </Pressable>
                <Pressable key={7} style={styles.row} onPress={() => drawItem(7)}>
                    <Entypo key={7} name={board[7]} size={32} color={chooseItemColor(7)} />
                </Pressable>
                <Pressable key={8} style={styles.row} onPress={() => drawItem(8)}>
                    <Entypo key={8} name={board[8]} size={32} color={chooseItemColor(8)} />
                </Pressable>
                <Pressable key={9} style={styles.row} onPress={() => drawItem(9)}>
                    <Entypo key={9} name={board[9]} size={32} color={chooseItemColor(9)} />
                </Pressable>
            </View>

            <View style={styles.flex}>
                <Pressable key={10} style={styles.row} onPress={() => drawItem(10)}>
                    <Entypo key={10} name={board[10]} size={32} color={chooseItemColor(10)} />
                </Pressable>
                <Pressable key={11} style={styles.row} onPress={() => drawItem(11)}>
                    <Entypo key={11} name={board[11]} size={32} color={chooseItemColor(11)} />
                </Pressable>
                <Pressable key={12} style={styles.row} onPress={() => drawItem(12)}>
                    <Entypo key={12} name={board[12]} size={32} color={chooseItemColor(12)} />
                </Pressable>
                <Pressable key={13} style={styles.row} onPress={() => drawItem(13)}>
                    <Entypo key={13} name={board[13]} size={32} color={chooseItemColor(13)} />
                </Pressable>
                <Pressable key={14} style={styles.row} onPress={() => drawItem(14)}>
                    <Entypo key={14} name={board[14]} size={32} color={chooseItemColor(14)} />
                </Pressable>

            </View>


            <View style={styles.flex}>
                <Pressable key={15} style={styles.row} onPress={() => drawItem(15)}>
                    <Entypo key={15} name={board[15]} size={32} color={chooseItemColor(15)} />
                </Pressable>
                <Pressable key={16} style={styles.row} onPress={() => drawItem(16)}>
                    <Entypo key={16} name={board[16]} size={32} color={chooseItemColor(16)} />
                </Pressable>
                <Pressable key={17} style={styles.row} onPress={() => drawItem(17)}>
                    <Entypo key={17} name={board[17]} size={32} color={chooseItemColor(17)} />
                </Pressable>
                <Pressable key={18} style={styles.row} onPress={() => drawItem(18)}>
                    <Entypo key={18} name={board[18]} size={32} color={chooseItemColor(18)} />
                </Pressable>
                <Pressable key={19} style={styles.row} onPress={() => drawItem(19)}>
                    <Entypo key={19} name={board[19]} size={32} color={chooseItemColor(19)} />
                </Pressable>

            </View>

            <View style={styles.flex}>
                <Pressable key={20} style={styles.row} onPress={() => drawItem(20)}>
                    <Entypo key={20} name={board[20]} size={32} color={chooseItemColor(20)} />
                </Pressable>
                <Pressable key={21} style={styles.row} onPress={() => drawItem(21)}>
                    <Entypo key={21} name={board[21]} size={32} color={chooseItemColor(21)} />
                </Pressable>
                <Pressable key={22} style={styles.row} onPress={() => drawItem(22)}>
                    <Entypo key={22} name={board[22]} size={32} color={chooseItemColor(22)} />
                </Pressable>
                <Pressable key={23} style={styles.row} onPress={() => drawItem(23)}>
                    <Entypo key={23} name={board[23]} size={32} color={chooseItemColor(23)} />
                </Pressable>
                <Pressable key={24} style={styles.row} onPress={() => drawItem(24)}>
                    <Entypo key={24} name={board[24]} size={32} color={chooseItemColor(24)} />
                </Pressable>

            </View>



            <Text style={styles.gameinfo}>Hits:{amounthits} Bombs:{amountbombs} Ships: {amountships}</Text>
            <Text style={styles.gameinfo}>Time: {seconds} sec </Text>
            <Text style={styles.gameinfo}>Status: {gameStatus} </Text>

            <Pressable style={styles.button} onPress={() => startOrNewGame()}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>


        </View>
    );



}


