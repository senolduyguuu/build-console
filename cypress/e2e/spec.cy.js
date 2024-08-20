describe('Build Log Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should display the Build Logs title', () => {
		cy.contains('Build Logs').should('be.visible');
	});

	it('should display the correct number of logs', () => {
		cy.get('.log-container').find('div').should('have.length', 6);
	});

	it('should copy logs to clipboard when copy button is clicked', () => {
		cy.get('button').contains('Copy Logs').click();
		cy.window().its('navigator.clipboard').invoke('readText').should('contain', 'Cloning Repository');
	});

	it('should handle clipboard API failure gracefully', () => {
		cy.window().then((win) => {
			cy.stub(win.navigator.clipboard, 'writeText').rejects(new Error('Clipboard write failed'));
		});
		cy.get('button').contains('Copy Logs').click();
		cy.on('window:alert', (text) => {
			expect(text).to.contains('Failed to copy logs');
		});
	});

	it('should download logs as a file when download button is clicked', () => {
		cy.get('button').contains('Download Logs').click();
		cy.readFile('cypress/downloads/build_logs.txt').should('exist');
	});

	it('should handle file download failure gracefully', () => {
		cy.window().then((win) => {
			cy.stub(win.URL, 'createObjectURL').throws(new Error('Download failed'));
		});
		cy.get('button').contains('Download Logs').click();
		cy.on('window:alert', (text) => {
			expect(text).to.contains('Failed to download logs');
		});
	});

	it('should reload logs when reload button is clicked', () => {
		cy.get('button').contains('Reload Logs').click();
		cy.get('.log-container').find('div').should('have.length', 6);
	});

	it('should clear logs when clear button is clicked', () => {
		cy.get('button').contains('Clear Logs').click();
		cy.get('.log-container').find('div').should('have.length', 0);
	});

	it('should show correct status during each stage of the build process', () => {
		cy.get('button').contains('Reload Logs').click();

		const stages = ["Cloning Repository", "Building Project", "Running Tests", "Deployment in Progress", "Finalizing", "Build Completed"];
		stages.forEach((stage, index) => {
			cy.wait(2000);
			cy.get('body').contains(stage).should('be.visible');
		});
	});
});
