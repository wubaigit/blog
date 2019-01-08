# 导入 Tensorflow 和 tf.keras
import tensorflow as tf
from tensorflow import keras

# 导入依赖
import numpy as np
import matplotlib.pyplot as plt

# 打印出 tensorflow 的版本
print(tf.__version__)

# 导入 fashion mnist 的数据集
# 可以使用 tensorflow 直接访问
# 会自动去网上下载该数据集
# 加载数据集会返回 4 个 Numpy 数组
# train_images 和 train_labels 数组是训练集
# test_images 和 test_labels 数组是测试集
# 图像为 28x28 的 Numpy 数组，像素值介于 0 和 255 之间
# 标签是整数数组，介于 0 到 9 之间，分别对应一种服饰的类别
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# 标签和服饰类别的对应表
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# 训练集一共 60000 张图片，每张图片都表示为 28x28 像素
# train_images.shape # (60000, 28, 28)
# len(train_labels) # 60000

# train_labels # array([9,0,0,...,3,0,5],dtype=uint8)

# 测试集同理，但是测试集是 10000 张图片

# 预处理
# plt.figure()
# plt.imshow(train_images[0])
# plt.colorbar()
# plt.grid(False)

train_images = train_images / 255.0
test_images = test_images / 255.0

plt.figure(figsize=(10,10))
for i in range(25):
    plt.subplot(5,5,i+1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    plt.imshow(train_images[i], cmap=plt.cm.binary)
    plt.xlabel(class_names[train_labels[i]])
