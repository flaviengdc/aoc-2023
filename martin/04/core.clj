(ns aoc.core
  (:gen-class)
  (:require [clojure.string :as str]))

(def input-file "input.txt")

(defn split-number-list [s]
  (map read-string (str/split (str/trim s) #"\s+")))

(defn parse-line
  "Parses a line and return winning numbers and picked numbers"
  [line]
  (def numbers (last  (str/split line #":")))
  (let [number-list (str/split numbers #"\|")]
    (def winning-numbers (first number-list))
    (def picked-numbers  (last  number-list)))
  {:winning (split-number-list winning-numbers)
   :picked  (set (split-number-list picked-numbers))})

(defn compute-points
  ([winning picked points]
   (if (empty? winning)
      ;; Base case
     points
      ;; Recursive case
     (compute-points
      (rest winning)
      picked
      (if (contains? picked (first winning))
        (max 1 (* 2 points))
        points))))
  ([winning picked]
   (compute-points winning picked 0)))

(defn get-card-points
  [{winning :winning,
    picked  :picked}]
  (compute-points winning picked))

(def lines
  (str/split-lines (slurp input-file)))

(def all-points (map (comp get-card-points parse-line) lines))

(println (reduce + all-points))
