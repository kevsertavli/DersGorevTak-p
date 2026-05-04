import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("Ders");
  const [priority, setPriority] = useState("Orta");
  const [filter, setFilter] = useState("Tümü");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Aktif") return !task.completed;
    if (filter === "Tamamlanan") return task.completed;
    return true;
  });

  const addTask = () => {
    if (title.trim() === "") {
      alert("Görev başlığı boş olamaz!");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category,
      priority,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>📚 Ders Görev Takip</Text>

      {/* STATS */}
      <View style={styles.stats}>
        <Text>📌 Toplam: {total}</Text>
        <Text>🟢 Aktif: {active}</Text>
        <Text>✅ Tamamlanan: {completed}</Text>
      </View>

      {/* INPUTS */}
      <TextInput
        style={styles.input}
        placeholder="Görev başlığı"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
      />

      {/* CATEGORY */}
      <Text style={styles.label}>Kategori</Text>
      <View style={styles.row}>
        {["Ders", "Proje", "Kişisel"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.selectButton,
              category === item && styles.selectedButton,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PRIORITY */}
      <Text style={styles.label}>Öncelik</Text>
      <View style={styles.row}>
        {["Düşük", "Orta", "Yüksek"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.selectButton,
              priority === item && styles.selectedButton,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Görev Ekle</Text>
      </TouchableOpacity>

      {/* FILTER */}
      <View style={styles.row}>
        {["Tümü", "Aktif", "Tamamlanan"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.selectButton,
              filter === item && styles.selectedButton,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 15 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Henüz görev yok
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text
              style={[
                styles.taskTitle,
                item.completed && styles.completedText,
              ]}
            >
              {item.completed ? "✅ " : "⭕ "}
              {item.title}
            </Text>

            <Text>{item.description}</Text>
            <Text>Kategori: {item.category}</Text>
            <Text>Öncelik: {item.priority}</Text>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => toggleComplete(item.id)}
            >
              <Text style={styles.completeText}>
                {item.completed ? "Aktif Yap" : "Tamamlandı Yap"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#eef2ff",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1e3a8a",
  },

  stats: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    gap: 6,
    elevation: 3,
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  taskCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  completeButton: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  completeText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  deleteText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },

  selectButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 5,
  },

  selectedButton: {
    backgroundColor: "#bfdbfe",
  },
});