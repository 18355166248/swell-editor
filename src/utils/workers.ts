import PQueue from "p-queue"

interface WebpackWorker {
  new (): Worker
}

// 生成执行队列
export function createWorkerQueue(NewWorker: WebpackWorker) {
  // 本地有跨域问题
  // const worker = new Worker(new URL(workerPath, import.meta.url))
  const worker = new NewWorker()
  const queue = new PQueue({ concurrency: 1 })
  return {
    worker,
    emit(data: any) {
      queue.clear()
      const _id = Math.random().toString(36).substring(2, 5)
      worker.postMessage({ _current: _id })
      return queue.add(
        () =>
          new Promise((resolve) => {
            function onMessage(event: any) {
              if (event.data._id !== _id) return
              worker.removeEventListener("message", onMessage)
              resolve(event.data)
            }
            worker.addEventListener("message", onMessage)
            worker.postMessage({ ...data, _id })
          })
      )
    },
    terminate() {
      worker.terminate()
    },
  }
}

export function requestResponse(worker: any, data: any) {
  return new Promise((resolve) => {
    const _id = Math.random().toString(36).substr(2, 5)
    function onMessage(event: any) {
      if (event.data._id !== _id) return
      worker.removeEventListener("message", onMessage)
      resolve(event.data)
    }
    worker.addEventListener("message", onMessage)
    worker.postMessage({ ...data, _id })
  })
}
