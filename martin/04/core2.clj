(ns aoc.core2
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

(defn get-nb-matching-numbers
  ([winning picked nb]
   (if (empty? winning)
      ;; Base case
     nb
      ;; Recursive case
     (get-nb-matching-numbers
      (rest winning)
      picked
      (if (contains? picked (first winning))
        (inc nb)
        nb))))
  ([winning picked]
   (get-nb-matching-numbers winning picked 0)))

(defn matches-from-numbers
  [{winning :winning,
    picked  :picked}]
  (get-nb-matching-numbers winning picked))

(def lines
  (str/split-lines (slurp input-file)))

(def all-matches
  (vec (map (comp matches-from-numbers parse-line) lines)))
(defn get-ith-card-matches
  [i]
  (get all-matches i))

(defn process-card
  "Recursively processes a card and its children, and returns an updated count"
  [cards-count i]
  (def nb-matches (get-ith-card-matches i))
  (let [n (inc i)]
    (def new-cards (range n (+ nb-matches n))))

   ;; Returns updated count for all cards
  (if (empty? new-cards)
    cards-count
    (reduce
     (fn [latest-cards-count i]
       (def new-count-value (inc (get latest-cards-count i)))
       (def new-cards-count (assoc latest-cards-count i new-count-value))

       (process-card new-cards-count i))
     cards-count
     new-cards)))

(def initial-cards-count
  (vec (map (fn [& _] 1) all-matches)))

(def cards-indexes
  (map-indexed (fn [i e] i) all-matches))

(def final-cards-count
  (reduce process-card initial-cards-count cards-indexes))

(println (reduce + final-cards-count))
