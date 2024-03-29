import { Request, Response } from "express";
import { BankDetailsService, BankTransactionService } from "../services"; // Assuming you have a BankTransactionService
import { BankDetails, BankTransaction } from "../models"; // Assuming you have a BankTransaction model
import { getPagingData } from "../helpers";
import { sequelize } from "../db";
import { Op } from "sequelize";

export class BankTransactionController {
	private bankTransactionService: BankTransactionService;
	private bankDetailsService: BankDetailsService;

	constructor() {
		this.bankTransactionService = new BankTransactionService(BankTransaction);
		this.bankDetailsService = new BankDetailsService(BankDetails);
	}

	options = {
		include: [
			{
				model: BankDetails,
				as: "bank",
			},
		],
	}; // You can add any options you need here

	getPaged(req: Request, res: Response) {
		const { page, size } = req.query;

		this.bankTransactionService
			.getPaged(page, size, this.options)
			.then((bankTransactions) => {
				res.status(200).json(getPagingData(bankTransactions));
			});
	}

	async getAll(req: Request, res: Response) {
		await this.bankTransactionService
			.getAll(this.options)
			.then((bankTransactions) => {
				res.status(200).json(bankTransactions);
			});
	}

	getById(req: Request, res: Response) {
		this.bankTransactionService
			.get(req.params.id, this.options)
			.then((bankTransaction) => {
				if (bankTransaction) {
					res.status(200).json(bankTransaction);
				} else
					res.status(404).json({
						message: `BankTransaction id:${req.params.id} does not exist`,
					});
			});
	}

	async upsert(req: Request, res: Response) {
		let { id, date, bank_id, withdraw_id, amount, description, credit } = req.body;

		let bankTransaction: any = {
			date,
			bank_id,
			withdraw_id,
			amount,
			description,
            credit,
		};
		if (id) bankTransaction = { ...bankTransaction, id };

		const t = await sequelize.transaction();

		try {
			// Creating or Updating bank transaction
			const [createdBankTransaction, isExist] = await BankTransaction.upsert(
				bankTransaction,
				{
					transaction: t,
					returning: true,
				}
			);

			t.commit();
			res.status(201).json(createdBankTransaction);
		} catch (err) {
			t.rollback();
			res.status(400).json(err);
			console.log(err);
		}
	}

	delete(req: Request, res: Response) {
		this.bankTransactionService.get(req.params.id).then((bankTransaction) => {
			if (bankTransaction) {
				this.bankTransactionService
					.delete(req.params.id)
					.then(() => res.status(200).json())
					.catch((err) => res.status(400).json(err));
			} else
				res.status(404).json({
					message: `BankTransaction id:${req.params.id} does not exist`,
				});
		});
	}

	async deleteByBankId(id: any) {
		const rowsDeleted = await BankTransaction.destroy({
			where: { bank_id: id },
		});

		return rowsDeleted;
	}

	async mergeBankDetails(bankTransactions: any) {
		var resData: Array<any> = [];
		var error: any = null;

		if (bankTransactions.map) {
			await Promise.all(
				bankTransactions.map(async (bankTransaction: any) => {
					const bankDetails = await this.bankDetailsService.get(
						bankTransaction.dataValues.bank_id,
						this.options
					);

					if (bankDetails) {
						resData.push({
							...bankDetails.dataValues,
							...bankTransaction.dataValues,
						});
					} else {
						error = `BankDetails id:${bankTransaction.dataValues.bank_id} does not exist`;
					}
				})
			);
		} else {
			const bankDetails = await this.bankDetailsService.get(
				bankTransactions.dataValues.bank_id,
				this.options
			);

			if (bankDetails) {
				resData = {
					...bankDetails.dataValues,
					...bankTransactions.dataValues,
				};
			} else {
				error = `BankDetails id:${bankTransactions.dataValues.bank_id} does not exist`;
			}
		}

		return {
			resData,
			error,
		};
	}
}
