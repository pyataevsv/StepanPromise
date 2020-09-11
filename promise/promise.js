function noob(params) {

}
class StepanPromise {

    constructor(ex) {
        this.queue = []
        this.errorHandler = noob
        this.finallyHandler = noob

        try {
            ex.call(null, this.res.bind(this), this.rej.bind(this))
        } catch (e) {
            this.errorHandler(e)
        } finally {
            this.finallyHandler()
        }
    }

    res(data) {
        this.queue.forEach(callback => {
            data = callback(data)
        })
        this.finallyHandler()
    }

    rej(error) {
        this.errorHandler(error)
        this.finallyHandler()
    }

    then(fn) {
        this.queue.push(fn)
        return this
    }

    catch(fn) {
        this.errorHandler = fn
        return this
    }

    finally(fn) {
        this.finallyHandler = fn
        return this
    }
}



module.exports = StepanPromise